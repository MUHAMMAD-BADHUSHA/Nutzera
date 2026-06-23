export interface Role {
  _id: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RoleQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateRoleInput {
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
}

export interface UpdateRoleInput extends CreateRoleInput {}

export interface RolePaginatedResponse {
  data: Role[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
