import { Router } from 'express';
import { authenticateAdmin, authorize } from '../middleware/auth.middleware';
import {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/admin.controller';

const router = Router();

router.use(authenticateAdmin);

router.get('/', authorize(['user.view']), getAdmins);
router.post('/', authorize(['user.create']), createAdmin);
router.put('/:id', authorize(['user.update']), updateAdmin);
router.delete('/:id', authorize(['user.delete']), deleteAdmin);

export default router;
