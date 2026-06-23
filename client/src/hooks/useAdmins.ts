'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminUserService } from '@/services/admin-user.service';
import type { CreateAdminUserInput, UpdateAdminUserInput } from '@/types/admin-user';

export function useAdmins() {
  return useQuery({
    queryKey: ['admins'],
    queryFn: () => adminUserService.getAdmins(),
  });
}

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAdminUserInput) => adminUserService.createAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
}

export function useUpdateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAdminUserInput }) =>
      adminUserService.updateAdmin(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
}

export function useDeleteAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminUserService.deleteAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
}
