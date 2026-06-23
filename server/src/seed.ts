import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { Admin } from './models/admin.model';
import { Role } from './models/role.model';
import { ALL_PERMISSIONS } from './services/auth.service';

dotenv.config();

const seedSuperAdmin = async () => {
  await connectDB();

  try {
    // 1. Seed or find Super Admin Role
    let superAdminRole = await Role.findOne({ name: 'Super Admin' });
    if (!superAdminRole) {
      superAdminRole = new Role({
        name: 'Super Admin',
        description: 'Super administrator with all permissions and root access',
        permissions: ALL_PERMISSIONS,
        isActive: true,
      });
      await superAdminRole.save();
      console.log('Super Admin role seeded successfully');
    } else {
      // Keep permissions updated
      superAdminRole.permissions = ALL_PERMISSIONS;
      await superAdminRole.save();
      console.log('Super Admin role permissions updated');
    }

    // 2. Seed or find Admin Role
    let adminRole = await Role.findOne({ name: 'Admin' });
    if (!adminRole) {
      adminRole = new Role({
        name: 'Admin',
        description: 'Standard administrator with access to dashboard, products, categories, orders, and users',
        permissions: [
          'dashboard.view',
          'product.view', 'product.create', 'product.update', 'product.delete',
          'category.view', 'category.create', 'category.update', 'category.delete',
          'order.view', 'order.update', 'order.delete',
          'user.view', 'user.create', 'user.update', 'user.delete'
        ],
        isActive: true,
      });
      await adminRole.save();
      console.log('Standard Admin role seeded successfully');
    }

    // 3. Seed or update Super Admin User
    const existingAdmin = await Admin.findOne({ email: 'admin@nutzera.in' });

    if (existingAdmin) {
      existingAdmin.role = 'superadmin';
      existingAdmin.roleId = superAdminRole._id as any;
      await existingAdmin.save();
      console.log('Super admin user updated with role link');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('nutzera@123', 10);

    const superAdmin = new Admin({
      email: 'admin@nutzera.in',
      password: hashedPassword,
      role: 'superadmin',
      roleId: superAdminRole._id,
      isActive: true,
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