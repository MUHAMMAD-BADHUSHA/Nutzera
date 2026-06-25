import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().max(20, 'Phone must be under 20 characters').optional(),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be under 200 characters'),
  message: z.string().min(1, 'Message is required').max(5000, 'Message must be under 5000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
