import { Request, Response } from 'express';
import { UploadService } from './upload.service';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedMimes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Allowed: JPG, PNG, WebP, GIF',
      });
    }

    const maxSize = 5 * 1024 * 1024;
    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB',
      });
    }

    const result = await UploadService.uploadImage(
      req.file.buffer,
      req.file.originalname
    );

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: result.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to upload image',
    });
  }
};
