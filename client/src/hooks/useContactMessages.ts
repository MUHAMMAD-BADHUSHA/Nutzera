'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactMessageService } from '@/services/contact-message.service';
import type {
  ContactMessageQueryParams,
  CreateContactMessageInput,
} from '@/types/contact-message';

export function useContactMessages(params?: ContactMessageQueryParams) {
  return useQuery({
    queryKey: ['contact-messages', params],
    queryFn: () => contactMessageService.getMessages(params),
  });
}

export function useContactMessage(id: string) {
  return useQuery({
    queryKey: ['contact-message', id],
    queryFn: () => contactMessageService.getMessageById(id),
    enabled: !!id,
  });
}

export function useSendContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContactMessageInput) =>
      contactMessageService.sendMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactMessageService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    },
  });
}

export function useDeleteContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactMessageService.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    },
  });
}
