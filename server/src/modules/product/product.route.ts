import { Router } from 'express';
import { authenticateAdmin } from '../../middleware/auth.middleware';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  getCategories,
} from './product.controller';

const router = Router();

router.use(authenticateAdmin);

router.get('/categories', getCategories);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/status', toggleProductStatus);

export default router;
