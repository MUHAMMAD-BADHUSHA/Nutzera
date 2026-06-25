export interface CreatePageInput {
  title: string;
  slug?: string;
  description?: string;
  bannerImage?: string;
  content?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogImage?: string;
  status?: 'published' | 'draft';
}

export interface UpdatePageInput extends Partial<CreatePageInput> {}

export interface PageQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
