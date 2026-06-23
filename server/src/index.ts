import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import uploadRoutes from './modules/upload/upload.route';
import productRoutes from './modules/product/product.route';
import roleRoutes from './routes/role.routes';
import adminUserRoutes from './routes/admin.routes';
import adminUsersRoutes from './routes/adminusers.routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:3000', 'https://nutzera.vercel.app'];

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin/products', productRoutes);
app.use('/api/admin/roles', roleRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/adminusers', adminUsersRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

export default app;