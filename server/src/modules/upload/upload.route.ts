import { Router } from 'express';
import multer from 'multer';
import { uploadImage } from './upload.controller';
import { authenticateAdmin } from '../../middleware/auth.middleware';

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: JPG, PNG, WebP, GIF'));
    }
  },
});

router.post('/image', authenticateAdmin, upload.single('image'), uploadImage);

export default router;
