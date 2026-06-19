export interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  className?: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
  };
}
