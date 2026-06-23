import { axiosInstance } from '@/lib/axios';
import type { AdminUser, CreateAdminUserInput, UpdateAdminUserInput } from '@/types/admin-user';
import type { ApiResponse } from './role.service';

export const adminUserService = {
  async getAdmins(): Promise<AdminUser[]> {
    const response = await axiosInstance.get<ApiResponse<AdminUser[]>>('/api/admin/users');
    return response.data.data;
  },

  async createAdmin(data: CreateAdminUserInput): Promise<AdminUser> {
    const response = await axiosInstance.post<ApiResponse<AdminUser>>('/api/admin/users', data);
    return response.data.data;
  },

  async updateAdmin(id: string, data: UpdateAdminUserInput): Promise<AdminUser> {
    const response = await axiosInstance.put<ApiResponse<AdminUser>>(`/api/admin/users/${id}`, data);
    return response.data.data;
  },

  async deleteAdmin(id: string): Promise<void> {
    await axiosInstance.delete(`/api/admin/users/${id}`);
  },
};
