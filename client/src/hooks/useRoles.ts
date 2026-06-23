'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from '@/services/role.service';
import type { RoleQueryParams, CreateRoleInput, UpdateRoleInput } from '@/types/role';

export function useRoles(params?: RoleQueryParams) {
  return useQuery({
    queryKey: ['roles', params],
    queryFn: () => roleService.getRoles(params),
  });
}

export function useRole(id: string) {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => roleService.getRole(id),
    enabled: !!id,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleInput) => roleService.createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoleInput }) =>
      roleService.updateRole(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role', id] });
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => roleService.deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
}
