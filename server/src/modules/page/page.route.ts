import { Router } from 'express';
import { authenticateAdmin } from '../../middleware/auth.middleware';
import {
  createPage,
  getPages,
  getPageBySlug,
  getPageById,
  updatePage,
  deletePage,
  getPublishedPages,
} from './page.controller';

const router = Router();

// Public route
router.get('/published', getPublishedPages);

// Public route - get by slug
router.get('/slug/:slug', getPageBySlug);

// Admin routes
router.use(authenticateAdmin);

router.get('/', getPages);
router.get('/:id', getPageById);
router.post('/', createPage);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);

export default router;
