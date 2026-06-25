import { z } from 'zod';

export const createPageSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().optional(),
  description: z.string().optional(),
  bannerImage: z.string().optional(),
  content: z.string().optional(),
  seoTitle: z.string().max(200).optional(),
  seoDescription: z.string().max(500).optional(),
  seoKeywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  status: z.enum(['published', 'draft']).optional(),
});

export const updatePageSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  bannerImage: z.string().optional(),
  content: z.string().optional(),
  seoTitle: z.string().max(200).optional(),
  seoDescription: z.string().max(500).optional(),
  seoKeywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  status: z.enum(['published', 'draft']).optional(),
});

export type CreatePageBody = z.infer<typeof createPageSchema>;
export type UpdatePageBody = z.infer<typeof updatePageSchema>;
