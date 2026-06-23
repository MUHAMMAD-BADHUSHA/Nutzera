import { axiosInstance } from '@/lib/axios';
import type {
  Role,
  RoleQueryParams,
  RolePaginatedResponse,
  CreateRoleInput,
  UpdateRoleInput,
} from '@/types/role';

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export const roleService = {
  async getRoles(params?: RoleQueryParams): Promise<RolePaginatedResponse> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.search) searchParams.set('search', params.search);

    const queryString = searchParams.toString();
    const url = `/api/admin/roles${queryString ? `?${queryString}` : ''}`;

    const response = await axiosInstance.get<ApiResponse<Role[]> & { pagination: RolePaginatedResponse['pagination'] }>(url);

    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
  },

  async getRole(id: string): Promise<Role> {
    const response = await axiosInstance.get<ApiResponse<Role>>(`/api/admin/roles/${id}`);
    return response.data.data;
  },

  async createRole(data: CreateRoleInput): Promise<Role> {
    const response = await axiosInstance.post<ApiResponse<Role>>('/api/admin/roles', data);
    return response.data.data;
  },

  async updateRole(id: string, data: UpdateRoleInput): Promise<Role> {
    const response = await axiosInstance.put<ApiResponse<Role>>(`/api/admin/roles/${id}`, data);
    return response.data.data;
  },

  async deleteRole(id: string): Promise<void> {
    await axiosInstance.delete(`/api/admin/roles/${id}`);
  },
};
