'use client';

import { Suspense, useState, useMemo } from 'react';
import { Shield, Plus, Search, MoreHorizontal, Edit, Trash2, Eye, ShieldCheck, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { useRoles, useCreateRole, useUpdateRole, useDeleteRole } from '@/hooks/useRoles';
import { RoleForm } from '@/components/admin/roles/RoleForm';
import { RoleDetails } from '@/components/admin/roles/RoleDetails';
import { PermissionGuard } from '@/components/admin/PermissionGuard';
import type { Role } from '@/types/role';
import type { RoleFormData } from '@/validations/role.schema';

export default function RolesAndPermissions() {
  return (
    <PermissionGuard permission="role.view">
      <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
        <RolesContent />
      </Suspense>
    </PermissionGuard>
  );
}

function RolesContent() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [detailsRole, setDetailsRole] = useState<Role | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useRoles({ page, limit: 10, search });
  const createRoleMutation = useCreateRole();
  const updateRoleMutation = useUpdateRole();
  const deleteRoleMutation = useDeleteRole();

  const roles = data?.data || [];
  const pagination = data?.pagination;

  const handleOpenCreate = () => {
    setSelectedRole(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (role: Role) => {
    setSelectedRole(role);
    setIsFormOpen(true);
  };

  const handleOpenDetails = (role: Role) => {
    setDetailsRole(role);
    setIsDetailsOpen(true);
  };

  const handleFormSubmit = async (formData: RoleFormData) => {
    try {
      if (selectedRole) {
        await updateRoleMutation.mutateAsync({
          id: selectedRole._id,
          data: formData,
        });
        toast.success('Role updated successfully');
      } else {
        await createRoleMutation.mutateAsync(formData);
        toast.success('Role created successfully');
      }
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save role');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRoleMutation.mutateAsync(deleteId);
      toast.success('Role deleted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete role');
    } finally {
      setDeleteId(null);
    }
  };

  // TanStack Table Column Definition
  const columnHelper = createColumnHelper<Role>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Role Name',
        cell: (info) => (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#047857] flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={16} />
            </div>
            <span className="font-semibold text-gray-900">{info.getValue()}</span>
          </div>
        ),
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: (info) => <span className="text-gray-500 line-clamp-1 max-w-[200px]">{info.getValue()}</span>,
      }),
      columnHelper.accessor('permissions', {
        header: 'Permissions',
        cell: (info) => {
          const count = info.getValue()?.length || 0;
          return (
            <Badge variant="secondary" className="bg-[#10B981]/10 text-[#065F46] border-none font-medium">
              {count} permission{count !== 1 ? 's' : ''}
            </Badge>
          );
        },
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created Date',
        cell: (info) => {
          const val = info.getValue();
          return val ? format(new Date(val), 'MMM d, yyyy') : '-';
        },
      }),
      columnHelper.accessor('isActive', {
        header: 'Status',
        cell: (info) => (
          <Badge variant={info.getValue() ? 'success' : 'secondary'}>
            {info.getValue() ? 'Active' : 'Inactive'}
          </Badge>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: (info) => {
          const role = info.row.original;
          const isSuperAdmin = role.name === 'Super Admin';

          return (
            <div className="flex items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => handleOpenDetails(role)}>
                    <Eye size={14} className="mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleOpenEdit(role)}>
                    <Edit size={14} className="mr-2" />
                    Edit Role
                  </DropdownMenuItem>
                  {!isSuperAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setDeleteId(role._id)}
                        className="text-red-600 focus:bg-red-50 focus:text-red-700"
                      >
                        <Trash2 size={14} className="mr-2" />
                        Delete Role
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: roles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roles & Permissions</h1>
          <p className="text-sm text-gray-500 mt-1">Configure security roles and feature permission levels</p>
        </div>
        <PermissionGuard permission="role.create" fallback={null}>
          <Button onClick={handleOpenCreate} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/10">
            <Plus size={18} className="mr-1.5" />
            Add Role
          </Button>
        </PermissionGuard>
      </div>

      <Card className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white">
        <CardHeader className="p-5 border-b border-gray-100 bg-white">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search roles by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 border-gray-200 focus:border-[#10B981] focus:ring-[#10B981]/20 transition-all rounded-xl"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-4 bg-white">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
              ))}
            </div>
          ) : roles.length === 0 ? (
            <div className="text-center py-16 bg-white">
              <Shield size={48} className="mx-auto text-gray-300 mb-4 stroke-[1.5]" />
              <h3 className="font-semibold text-gray-900 mb-1">No roles found</h3>
              <p className="text-sm text-gray-500">Add a new role or modify your search filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-b border-gray-100 bg-gray-50/50">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50/30 transition-colors group"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-5 py-4.5 align-middle">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-white">
              <p className="text-xs text-gray-500">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} roles
              </p>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-lg text-xs"
                >
                  Previous
                </Button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs p-0 ${
                      p === page ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''
                    }`}
                  >
                    {p}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                  className="rounded-lg text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl p-6">
          <DialogHeader className="border-b border-gray-100 pb-3 mb-4">
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="text-[#10B981]" size={20} />
              {selectedRole ? 'Edit Security Role' : 'Create Security Role'}
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              Configure parameters and access matrices below.
            </DialogDescription>
          </DialogHeader>

          <RoleForm
            initialData={selectedRole || undefined}
            onSubmit={handleFormSubmit}
            isLoading={createRoleMutation.isPending || updateRoleMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-xl rounded-2xl p-6">
          <DialogHeader className="border-b border-gray-100 pb-3 mb-4">
            <DialogTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Shield className="text-[#10B981]" size={18} />
              Role Specifications
            </DialogTitle>
          </DialogHeader>

          {detailsRole && <RoleDetails role={detailsRole} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this role? Any administrator accounts using this role will lose their custom clearance level. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
