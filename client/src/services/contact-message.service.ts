import { axiosInstance } from '@/lib/axios';
import type {
  ContactMessage,
  CreateContactMessageInput,
  ContactMessageQueryParams,
  PaginatedResponse,
  ApiResponse,
} from '@/types/contact-message';

export const contactMessageService = {
  async getMessages(
    params?: ContactMessageQueryParams
  ): Promise<PaginatedResponse<ContactMessage>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.search) searchParams.set('search', params.search);
    if (params?.status) searchParams.set('status', params.status);

    const queryString = searchParams.toString();
    const url = `/api/admin/contact-messages${queryString ? `?${queryString}` : ''}`;

    const response = await axiosInstance.get<
      ApiResponse<ContactMessage[]> & {
        pagination: PaginatedResponse<ContactMessage>['pagination'];
      }
    >(url);

    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
  },

  async getMessageById(id: string): Promise<ContactMessage> {
    const response = await axiosInstance.get<ApiResponse<ContactMessage>>(
      `/api/admin/contact-messages/${id}`
    );
    return response.data.data;
  },

  async sendMessage(data: CreateContactMessageInput): Promise<ContactMessage> {
    const response = await axiosInstance.post<ApiResponse<ContactMessage>>(
      '/api/contact',
      data
    );
    return response.data.data;
  },

  async markAsRead(id: string): Promise<ContactMessage> {
    const response = await axiosInstance.patch<ApiResponse<ContactMessage>>(
      `/api/admin/contact-messages/${id}/read`
    );
    return response.data.data;
  },

  async deleteMessage(id: string): Promise<void> {
    await axiosInstance.delete(`/api/admin/contact-messages/${id}`);
  },
};
