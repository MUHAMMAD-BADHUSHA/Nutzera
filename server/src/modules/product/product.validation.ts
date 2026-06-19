import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().optional(),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  discountPrice: z.number().min(0).optional(),
  stock: z.number().min(0, 'Stock cannot be negative').int(),
  image: z.string().min(1, 'Image is required').url('Image must be a valid URL'),
  category: z.string().min(1, 'Category is required'),
});

export const updateProductSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().min(1).optional(),
  shortDescription: z.string().optional(),
  price: z.number().min(0.01).optional(),
  discountPrice: z.number().min(0).optional(),
  stock: z.number().min(0).int().optional(),
  image: z.string().min(1).url().optional(),
  category: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
});

export type CreateProductBody = z.infer<typeof createProductSchema>;
export type UpdateProductBody = z.infer<typeof updateProductSchema>;
