import cloudinary from '../../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

interface UploadOptions {
  folder?: string;
  allowedFormats?: string[];
  maxWidth?: number;
  maxHeight?: number;
}

const DEFAULT_OPTIONS: UploadOptions = {
  folder: 'nutzera',
  allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
};

export class UploadService {
  static async uploadImage(
    fileBuffer: Buffer,
    originalName: string,
    options: UploadOptions = {}
  ): Promise<{ url: string; publicId: string }> {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: mergedOptions.folder,
          public_id: `upload_${Date.now()}_${Math.random().toString(36).substring(7)}`,
          resource_type: 'image',
          format: this.getFormatFromName(originalName),
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload failed'));
          resolve(result);
        }
      );

      uploadStream.end(fileBuffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  static async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }

  private static getFormatFromName(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext && ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) {
      return ext === 'jpg' ? 'jpeg' : ext;
    }
    return 'png';
  }
}
