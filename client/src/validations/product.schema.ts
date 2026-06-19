import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name must be under 200 characters'),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().optional(),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  discountPrice: z.number().min(0).optional(),
  stock: z.number().min(0, 'Stock cannot be negative').int('Stock must be a whole number'),
  image: z.string().min(1, 'Image is required'),
  category: z.string().min(1, 'Category is required'),
});

export type ProductFormData = z.infer<typeof productSchema>;
