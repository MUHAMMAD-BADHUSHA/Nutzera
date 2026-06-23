import { Request, Response } from 'express';
import { Admin } from '../models/admin.model';
import { Role } from '../models/role.model';
import { AuthService } from '../services/auth.service';
import { z } from 'zod';

const createAdminSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  roleId: z.string().min(1, 'Role ID is required'),
  isActive: z.boolean().default(true),
});

const updateAdminSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  roleId: z.string().min(1, 'Role ID is required'),
  isActive: z.boolean().default(true),
});

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.find()
      .populate('roleId')
      .select('-password')
      .sort({ createdAt: -1 });

    return res.json({ data: admins });
  } catch (error) {
    console.error('getAdmins error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const parsed = createAdminSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    const { email, password, roleId, isActive } = parsed.data;

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(400).json({ message: 'Selected role does not exist' });
    }

    const hashedPassword = await AuthService.hashPassword(password);

    const admin = new Admin({
      email: email.toLowerCase(),
      password: hashedPassword,
      roleId,
      isActive,
      role: role.name === 'Super Admin' ? 'superadmin' : 'admin',
    });

    await admin.save();

    const adminResponse = admin.toObject() as any;
    delete adminResponse.password;

    return res.status(201).json({ data: adminResponse });
  } catch (error) {
    console.error('createAdmin error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = updateAdminSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    const { email, password, roleId, isActive } = parsed.data;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    // Prevent disabling the main Super Admin account
    if (admin.email === 'admin@nutzera.in') {
      if (!isActive) {
        return res.status(400).json({ message: 'Primary Super Admin account cannot be deactivated' });
      }
    }

    const existingAdmin = await Admin.findOne({
      email: email.toLowerCase(),
      _id: { $ne: id },
    });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(400).json({ message: 'Selected role does not exist' });
    }

    // If changing password
    if (password && password.trim() !== '') {
      admin.password = await AuthService.hashPassword(password);
    }

    admin.email = email.toLowerCase();
    admin.roleId = role._id as any;
    admin.isActive = isActive;
    admin.role = role.name === 'Super Admin' ? 'superadmin' : 'admin';

    await admin.save();

    const adminResponse = admin.toObject() as any;
    delete adminResponse.password;

    return res.json({ data: adminResponse });
  } catch (error) {
    console.error('updateAdmin error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    // Prevent deletion of primary seed superadmin
    if (admin.email === 'admin@nutzera.in') {
      return res.status(400).json({ message: 'Primary Super Admin account cannot be deleted' });
    }

    // Prevent user deleting their own account
    const loggedInAdminPayload = (req as any).admin;
    if (loggedInAdminPayload && loggedInAdminPayload.id === id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    await Admin.findByIdAndDelete(id);
    return res.json({ message: 'Admin user deleted successfully' });
  } catch (error) {
    console.error('deleteAdmin error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
