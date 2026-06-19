import { axiosInstance } from '@/lib/axios';
import type {
  Product,
  CreateProductInput,
  UpdateProductInput,
  ProductQueryParams,
  PaginatedResponse,
  ApiResponse,
} from '@/types/product';

export const productService = {
  async getProducts(params?: ProductQueryParams): Promise<PaginatedResponse<Product>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.search) searchParams.set('search', params.search);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.isActive !== undefined) searchParams.set('isActive', String(params.isActive));

    const queryString = searchParams.toString();
    const url = `/api/admin/products${queryString ? `?${queryString}` : ''}`;

    const response = await axiosInstance.get<ApiResponse<Product[]> & { pagination: PaginatedResponse<Product>['pagination'] }>(url);

    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
  },

  async getProduct(id: string): Promise<Product> {
    const response = await axiosInstance.get<ApiResponse<Product>>(`/api/admin/products/${id}`);
    return response.data.data;
  },

  async createProduct(data: CreateProductInput): Promise<Product> {
    const response = await axiosInstance.post<ApiResponse<Product>>('/api/admin/products', data);
    return response.data.data;
  },

  async updateProduct(id: string, data: UpdateProductInput): Promise<Product> {
    const response = await axiosInstance.put<ApiResponse<Product>>(`/api/admin/products/${id}`, data);
    return response.data.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await axiosInstance.delete(`/api/admin/products/${id}`);
  },

  async toggleStatus(id: string): Promise<Product> {
    const response = await axiosInstance.patch<ApiResponse<Product>>(`/api/admin/products/${id}/status`);
    return response.data.data;
  },

  async getCategories(): Promise<string[]> {
    const response = await axiosInstance.get<ApiResponse<string[]>>('/api/admin/products/categories');
    return response.data.data;
  },
};
