'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pageService } from '@/services/page.service';
import type { PageQueryParams, CreatePageInput, UpdatePageInput } from '@/types/page';

export function usePages(params?: PageQueryParams) {
  return useQuery({
    queryKey: ['pages', params],
    queryFn: () => pageService.getPages(params),
  });
}

export function usePageBySlug(slug: string) {
  return useQuery({
    queryKey: ['page', 'slug', slug],
    queryFn: () => pageService.getPageBySlug(slug),
    enabled: !!slug,
  });
}

export function usePage(id: string) {
  return useQuery({
    queryKey: ['page', id],
    queryFn: () => pageService.getPageById(id),
    enabled: !!id,
  });
}

export function useCreatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePageInput) => pageService.createPage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}

export function useUpdatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePageInput }) =>
      pageService.updatePage(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
      queryClient.invalidateQueries({ queryKey: ['page', id] });
    },
  });
}

export function useDeletePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pageService.deletePage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}
