import { z } from 'zod';

export const createAdminSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  roleId: z.string().min(1, 'Please select a role'),
  isActive: z.boolean().default(true),
});

export const updateAdminSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  roleId: z.string().min(1, 'Please select a role'),
  isActive: z.boolean().default(true),
});

export type CreateAdminFormData = z.infer<typeof createAdminSchema>;
export type UpdateAdminFormData = z.infer<typeof updateAdminSchema>;
