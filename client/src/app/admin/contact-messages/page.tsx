'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  Eye,
  MessageSquare,
  Phone,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  useContactMessages,
  useContactMessage,
  useMarkAsRead,
  useDeleteContactMessage,
} from '@/hooks/useContactMessages';
import { PermissionGuard } from '@/components/admin/PermissionGuard';
import { cn } from '@/lib/utils';

export default function ContactMessagesPage() {
  return (
    <PermissionGuard permission="settings.view">
      <ContactMessagesContent />
    </PermissionGuard>
  );
}

function ContactMessagesContent() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [viewId, setViewId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useContactMessages({
    page,
    limit: 10,
    search,
    status: statusFilter,
  });
  const markAsRead = useMarkAsRead();
  const deleteMessage = useDeleteContactMessage();

  const messages = data?.data || [];
  const pagination = data?.pagination;

  const handleView = async (id: string) => {
    setViewId(id);
    const msg = messages.find((m) => m._id === id);
    if (msg && msg.status === 'unread') {
      await markAsRead.mutateAsync(id);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMessage.mutateAsync(deleteId);
    setDeleteId(null);
    setViewId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage contact form submissions
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search messages..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="flex h-10 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]"
            >
              <option value="">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No messages found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                      Contact
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                      Subject
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                      Message
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                      Date
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {messages.map((msg) => (
                    <tr
                      key={msg._id}
                      className={cn(
                        'hover:bg-gray-50/50 transition-colors',
                        msg.status === 'unread' && 'bg-[#10B981]/5'
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#064E3B]/10 flex items-center justify-center flex-shrink-0">
                            <User size={18} className="text-[#10B981]" />
                          </div>
                          <div className="min-w-0">
                            <p
                              className={cn(
                                'font-medium text-gray-900 truncate',
                                msg.status === 'unread' && 'font-semibold'
                              )}
                            >
                              {msg.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {msg.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                        {msg.subject}
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden lg:table-cell max-w-[200px] truncate">
                        {msg.message}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={msg.status === 'unread' ? 'warning' : 'secondary'}>
                          {msg.status === 'unread' ? 'Unread' : 'Read'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                        {format(new Date(msg.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(msg._id)}
                            title="View"
                          >
                            {msg.status === 'unread' ? (
                              <Mail size={16} className="text-[#10B981]" />
                            ) : (
                              <MailOpen size={16} />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(msg._id)}
                            title="Delete"
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} messages
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Button
                      key={p}
                      variant={p === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      <ViewMessageDialog viewId={viewId} onClose={() => setViewId(null)} />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ViewMessageDialog({
  viewId,
  onClose,
}: {
  viewId: string | null;
  onClose: () => void;
}) {
  const { data: message, isLoading } = useContactMessage(viewId || '');

  return (
    <Dialog open={!!viewId} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Contact Message</DialogTitle>
          <DialogDescription>
            {isLoading ? 'Loading...' : `From ${message?.name}`}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : message ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Name</p>
                <p className="text-sm font-medium flex items-center gap-2">
                  <User size={14} className="text-gray-400" />
                  {message.name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Email</p>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Mail size={14} className="text-gray-400" />
                  {message.email}
                </p>
              </div>
              {message.phone && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase">Phone</p>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" />
                    {message.phone}
                  </p>
                </div>
              )}
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase">Date</p>
                <p className="text-sm font-medium">
                  {format(new Date(message.createdAt), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Subject</p>
              <p className="text-sm font-medium">{message.subject}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Message</p>
              <div className="text-sm text-gray-700 bg-gray-50 rounded-xl p-4 whitespace-pre-wrap">
                {message.message}
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
