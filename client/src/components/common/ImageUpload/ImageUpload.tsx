"use client";

import { useState, useRef, useCallback } from "react";
import { ImagePlus, Loader2, X, Upload } from "lucide-react";
import { uploadImage } from "./upload.service";
import type { ImageUploadProps } from "./types";

export function ImageUpload({ value, onChange, className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setError(null);

      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Allowed: JPG, PNG, WebP, GIF");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File too large. Maximum size is 5MB");
        return;
      }

      setUploading(true);
      try {
        const url = await uploadImage(file);
        onChange(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [onChange]
  );

  const handleRemove = useCallback(() => {
    onChange("");
    setError(null);
  }, [onChange]);

  const handleClick = useCallback(() => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  }, [uploading]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const input = fileInputRef.current;
        if (input) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          input.files = dataTransfer.files;
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  if (value) {
    return (
      <div className={`relative group ${className}`}>
        <div className="w-full aspect-square max-h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
          <img
            src={value}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/10 transition-all pointer-events-none" />
        <button
          type="button"
          onClick={handleRemove}
          className="absolute top-2 right-2 p-1.5 bg-white/95 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all shadow-sm opacity-0 group-hover:opacity-100"
        >
          <X size={14} />
        </button>
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className="absolute bottom-2 right-2 px-3 py-1.5 bg-white/95 text-gray-700 rounded-lg hover:bg-white text-xs font-medium transition-all shadow-sm opacity-0 group-hover:opacity-100 flex items-center gap-1"
        >
          <Upload size={12} />
          Replace
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        disabled={uploading}
        className="w-full aspect-square max-h-48 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#10B981] hover:text-[#10B981] hover:bg-[#10B981]/5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-gray-50/50"
      >
        {uploading ? (
          <>
            <Loader2 size={24} className="animate-spin text-[#10B981]" />
            <span className="text-xs font-medium text-gray-500">Uploading...</span>
          </>
        ) : (
          <>
            <ImagePlus size={24} />
            <div className="text-center">
              <p className="text-xs font-medium text-gray-600">Click to upload</p>
              <p className="text-[10px] text-gray-400 mt-0.5">JPG, PNG, WebP (max 5MB)</p>
            </div>
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-red-500 mt-1.5">{error}</p>
      )}
    </div>
  );
}
