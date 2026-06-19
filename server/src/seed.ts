import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { Admin } from './models/admin.model';

dotenv.config();

const seedSuperAdmin = async () => {
  await connectDB();

  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@nutzera.in' });

    if (existingAdmin) {
      console.log('Super admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('nutzera@123', 10);

    const superAdmin = new Admin({
      email: 'admin@nutzera.in',
      password: hashedPassword,
      role: 'superadmin'
    });

    await superAdmin.save();
    console.log('Super admin seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedSuperAdmin();