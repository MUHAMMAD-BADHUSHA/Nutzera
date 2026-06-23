import { Request, Response } from 'express';
import { Role } from '../models/role.model';
import { Admin } from '../models/admin.model';
import { z } from 'zod';

const roleSchema = z.object({
  name: z.string().min(1, 'Role name is required').max(100, 'Role name too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description too long'),
  permissions: z.array(z.string()),
  isActive: z.boolean().default(true),
});

export const getRoles = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const total = await Role.countDocuments(query);
    const roles = await Role.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.json({
      data: roles,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('getRoles error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    return res.json({ data: role });
  } catch (error) {
    console.error('getRoleById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const parsed = roleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    const { name, description, permissions, isActive } = parsed.data;

    const existingRole = await Role.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
    if (existingRole) {
      return res.status(400).json({ message: 'Role name already exists' });
    }

    const role = new Role({
      name,
      description,
      permissions,
      isActive,
    });

    await role.save();
    return res.status(201).json({ data: role });
  } catch (error) {
    console.error('createRole error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = roleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    const { name, description, permissions, isActive } = parsed.data;

    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Prevent altering the Super Admin name, but allow description/permissions if needed, or lock it completely.
    // Let's completely lock Super Admin role name and keep it active
    if (role.name === 'Super Admin') {
      if (name !== 'Super Admin') {
        return res.status(400).json({ message: 'Cannot rename Super Admin role' });
      }
      if (!isActive) {
        return res.status(400).json({ message: 'Super Admin role must remain active' });
      }
    }

    const existingRole = await Role.findOne({
      name: { $regex: `^${name}$`, $options: 'i' },
      _id: { $ne: id },
    });
    if (existingRole) {
      return res.status(400).json({ message: 'Role name already exists' });
    }

    role.name = name;
    role.description = description;
    role.permissions = permissions;
    role.isActive = isActive;

    await role.save();
    return res.json({ data: role });
  } catch (error) {
    console.error('updateRole error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    if (role.name === 'Super Admin') {
      return res.status(400).json({ message: 'Super Admin role cannot be deleted' });
    }

    // Check if any users are assigned to this role
    const assignedUsersCount = await Admin.countDocuments({ roleId: id });
    if (assignedUsersCount > 0) {
      return res.status(400).json({
        message: `Cannot delete role. It is currently assigned to ${assignedUsersCount} user(s).`,
      });
    }

    await Role.findByIdAndDelete(id);
    return res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('deleteRole error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
