import { Router } from 'express';
import { authenticateAdmin } from '../../middleware/auth.middleware';
import {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  markAsRead,
  deleteContactMessage,
} from './contact.controller';

const router = Router();

// Public route - submit contact form
router.post('/', createContactMessage);

// Admin routes
router.use(authenticateAdmin);

router.get('/', getContactMessages);
router.get('/:id', getContactMessageById);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteContactMessage);

export default router;
