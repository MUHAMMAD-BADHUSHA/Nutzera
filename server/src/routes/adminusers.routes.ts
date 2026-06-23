import { Router } from 'express';
import { authenticateAdmin, authorize } from '../middleware/auth.middleware';
import {
  getAdminUsers,
  getAdminUserById,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  updateStatus,
  resetPassword,
  bulkDelete,
} from '../controllers/adminusers.controller';

const router = Router();
router.use(authenticateAdmin);

router.get('/', authorize(['user.view']), getAdminUsers);
router.get('/:id', authorize(['user.view']), getAdminUserById);
router.post('/', authorize(['user.create']), createAdminUser);
router.put('/:id', authorize(['user.update']), updateAdminUser);
router.patch('/:id/status', authorize(['user.update']), updateStatus);
router.patch('/:id/reset-password', authorize(['user.update']), resetPassword);
router.post('/bulk-delete', authorize(['user.delete']), bulkDelete);
router.delete('/:id', authorize(['user.delete']), deleteAdminUser);

export default router;
