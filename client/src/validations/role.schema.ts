import { z } from 'zod';

export const roleSchema = z.object({
  name: z.string().min(1, 'Role name is required').max(100, 'Role name must be under 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be under 500 characters'),
  isActive: z.boolean(),
  permissions: z.array(z.string()).min(1, 'Select at least one permission'),
});

export type RoleFormData = z.infer<typeof roleSchema>;
