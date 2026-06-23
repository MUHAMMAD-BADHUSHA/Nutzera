import type { Role } from './role';

export interface AdminUser {
  _id: string;
  email: string;
  role: string;
  roleId?: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminUserInput {
  email: string;
  password?: string;
  roleId: string;
  isActive: boolean;
}

export interface UpdateAdminUserInput {
  email: string;
  password?: string;
  roleId: string;
  isActive: boolean;
}
