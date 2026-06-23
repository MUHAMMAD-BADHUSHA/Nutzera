import { Router } from 'express';
import { authenticateAdmin, authorize } from '../middleware/auth.middleware';
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from '../controllers/role.controller';

const router = Router();

router.use(authenticateAdmin);

router.get('/', authorize(['role.view']), getRoles);
router.get('/:id', authorize(['role.view']), getRoleById);
router.post('/', authorize(['role.create']), createRole);
router.put('/:id', authorize(['role.update']), updateRole);
router.delete('/:id', authorize(['role.delete']), deleteRole);

export default router;
