import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Routes working' });
});

export default router;