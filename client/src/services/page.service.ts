import { axiosInstance } from '@/lib/axios';
import type {
  Page,
  CreatePageInput,
  UpdatePageInput,
  PageQueryParams,
  PaginatedResponse,
  ApiResponse,
} from '@/types/page';

export const pageService = {
  async getPages(params?: PageQueryParams): Promise<PaginatedResponse<Page>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.search) searchParams.set('search', params.search);
    if (params?.status) searchParams.set('status', params.status);

    const queryString = searchParams.toString();
    const url = `/api/admin/pages${queryString ? `?${queryString}` : ''}`;

    const response = await axiosInstance.get<
      ApiResponse<Page[]> & { pagination: PaginatedResponse<Page>['pagination'] }
    >(url);

    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
  },

  async getPageBySlug(slug: string): Promise<Page> {
    const response = await axiosInstance.get<ApiResponse<Page>>(
      `/api/pages/slug/${slug}`
    );
    return response.data.data;
  },

  async getPageById(id: string): Promise<Page> {
    const response = await axiosInstance.get<ApiResponse<Page>>(
      `/api/admin/pages/${id}`
    );
    return response.data.data;
  },

  async createPage(data: CreatePageInput): Promise<Page> {
    const response = await axiosInstance.post<ApiResponse<Page>>(
      '/api/admin/pages',
      data
    );
    return response.data.data;
  },

  async updatePage(id: string, data: UpdatePageInput): Promise<Page> {
    const response = await axiosInstance.put<ApiResponse<Page>>(
      `/api/admin/pages/${id}`,
      data
    );
    return response.data.data;
  },

  async deletePage(id: string): Promise<void> {
    await axiosInstance.delete(`/api/admin/pages/${id}`);
  },

  async getPublishedPages(): Promise<Page[]> {
    const response = await axiosInstance.get<ApiResponse<Page[]>>(
      '/api/pages/published'
    );
    return response.data.data;
  },
};
