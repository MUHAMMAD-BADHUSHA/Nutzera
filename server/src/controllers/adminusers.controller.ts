import { Request, Response } from 'express';
import crypto from 'crypto';
import { Admin } from '../models/admin.model';
import { Role } from '../models/role.model';
import { AuditLog } from '../models/audit.model';
import { AuthService } from '../services/auth.service';
import { z } from 'zod';

// ─── Validation Schemas ─────────────────────────────────────────────────────

const createSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().or(z.literal('')),
  profileImage: z.string().optional().or(z.literal('')),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  roleId: z.string().min(1, 'Role is required'),
  status: z.enum(['active', 'inactive', 'suspended']).default('active'),
});

const updateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().or(z.literal('')),
  profileImage: z.string().optional().or(z.literal('')),
  password: z.string().min(6).optional().or(z.literal('')),
  roleId: z.string().min(1, 'Role is required'),
  status: z.enum(['active', 'inactive', 'suspended']),
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const audit = async (action: string, entityId: any, performedBy: any, details?: Record<string, any>) => {
  try {
    await AuditLog.create({ action, entity: 'AdminUser', entityId, performedBy, details });
  } catch { /* non-critical */ }
};

// ─── Controllers ─────────────────────────────────────────────────────────────

export const getAdminUsers = async (req: Request, res: Response) => {
  try {
    const { search, roleId, status, page = '1', limit = '10', sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const query: any = {};
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }
    if (status && status !== 'all') query.status = status;
    if (roleId && roleId !== 'all') query.roleId = roleId;

    const sortObj: any = { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 };

    const [total, users] = await Promise.all([
      Admin.countDocuments(query),
      Admin.find(query)
        .populate('roleId', 'name permissions isActive')
        .populate('createdBy', 'firstName lastName email')
        .select('-password')
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum),
    ]);

    return res.json({ data: users, pagination: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) } });
  } catch (error) {
    console.error('getAdminUsers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAdminUserById = async (req: Request, res: Response) => {
  try {
    const user = await Admin.findById(req.params.id)
      .populate('roleId', 'name permissions isActive description')
      .populate('createdBy', 'firstName lastName email')
      .select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    const auditLogs = await AuditLog.find({ entityId: req.params.id })
      .populate('performedBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(10);

    return res.json({ data: user, auditLogs });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createAdminUser = async (req: Request, res: Response) => {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

    const { firstName, lastName, email, phone, profileImage, password, roleId, status } = parsed.data;

    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const role = await Role.findById(roleId);
    if (!role) return res.status(400).json({ message: 'Selected role does not exist' });

    const performedById = (req as any).admin?.id;
    const user = await Admin.create({
      firstName, lastName,
      email: email.toLowerCase(),
      phone: phone || undefined,
      profileImage: profileImage || undefined,
      password: await AuthService.hashPassword(password),
      roleId, status: status || 'active',
      isActive: status === 'active' || !status,
      role: role.name === 'Super Admin' ? 'superadmin' : 'admin',
      createdBy: performedById,
    });

    await audit('USER_CREATED', user._id, performedById, { email: user.email, role: role.name });

    const resp = user.toObject() as any;
    delete resp.password;
    return res.status(201).json({ data: resp });
  } catch (error) {
    console.error('createAdminUser:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAdminUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.issues[0].message });

    const { firstName, lastName, email, phone, profileImage, password, roleId, status } = parsed.data;
    const requestingAdmin = (req as any).admin;

    const user = await Admin.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.email === 'admin@nutzera.in' && (status === 'inactive' || status === 'suspended')) {
      return res.status(400).json({ message: 'Primary Super Admin cannot be deactivated or suspended' });
    }

    const targetRole = await Role.findById(user.roleId);
    if (targetRole?.name === 'Super Admin' && requestingAdmin?.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only Super Admins can edit other Super Admins' });
    }

    const emailConflict = await Admin.findOne({ email: email.toLowerCase(), _id: { $ne: id } });
    if (emailConflict) return res.status(400).json({ message: 'Email already in use' });

    const role = await Role.findById(roleId);
    if (!role) return res.status(400).json({ message: 'Selected role does not exist' });

    Object.assign(user, {
      firstName, lastName, email: email.toLowerCase(),
      phone: phone || undefined,
      profileImage: profileImage || undefined,
      status, isActive: status === 'active',
      roleId, role: role.name === 'Super Admin' ? 'superadmin' : 'admin',
    });

    if (password && password.trim()) user.password = await AuthService.hashPassword(password);
    await user.save();

    await audit('USER_UPDATED', user._id, requestingAdmin?.id, { email: user.email });

    const resp = user.toObject() as any;
    delete resp.password;
    return res.json({ data: resp });
  } catch (error) {
    console.error('updateAdminUser:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAdminUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requestingAdmin = (req as any).admin;

    const user = await Admin.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.email === 'admin@nutzera.in') return res.status(400).json({ message: 'Primary Super Admin cannot be deleted' });
    if (requestingAdmin?.id === id) return res.status(400).json({ message: 'Cannot delete your own account' });

    const targetRole = await Role.findById(user.roleId);
    if (targetRole?.name === 'Super Admin' && requestingAdmin?.role !== 'superadmin') {
      return res.status(403).json({ message: 'Only Super Admins can delete other Super Admins' });
    }

    await Admin.findByIdAndDelete(id);
    await audit('USER_DELETED', id, requestingAdmin?.id, { email: user.email });

    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const user = await Admin.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.email === 'admin@nutzera.in' && status !== 'active') {
      return res.status(400).json({ message: 'Primary Super Admin must remain active' });
    }

    const oldStatus = user.status;
    user.status = status;
    user.isActive = status === 'active';
    await user.save();

    await audit('STATUS_CHANGED', user._id, (req as any).admin?.id, { from: oldStatus, to: status });
    return res.json({ data: { status: user.status, isActive: user.isActive } });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newPassword, generateTemp } = req.body;

    const user = await Admin.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let tempPassword: string | undefined;
    let passwordToSet = newPassword;

    if (generateTemp || !newPassword) {
      tempPassword = crypto.randomBytes(6).toString('hex');
      passwordToSet = tempPassword;
    }

    if (!passwordToSet || passwordToSet.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    user.password = await AuthService.hashPassword(passwordToSet);
    await user.save();

    await audit('PASSWORD_RESET', user._id, (req as any).admin?.id, { method: generateTemp ? 'temporary' : 'manual' });
    return res.json({ message: 'Password reset successfully', ...(tempPassword ? { temporaryPassword: tempPassword } : {}) });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const bulkDelete = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({ message: 'No IDs provided' });

    const requestingAdmin = (req as any).admin;
    const users = await Admin.find({ _id: { $in: ids } });
    const deletable = users.filter(u => u.email !== 'admin@nutzera.in' && u._id.toString() !== requestingAdmin?.id);

    if (deletable.length === 0) return res.status(400).json({ message: 'No deletable users in selection' });

    const deletableIds = deletable.map(u => u._id);
    await Admin.deleteMany({ _id: { $in: deletableIds } });

    for (const uid of deletableIds) {
      await audit('USER_DELETED', uid, requestingAdmin?.id, { bulk: true });
    }

    return res.json({ message: `${deletableIds.length} user(s) deleted`, deleted: deletableIds.length });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
