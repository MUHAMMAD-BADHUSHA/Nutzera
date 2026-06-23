'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roleSchema, type RoleFormData } from '@/validations/role.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Shield, CheckSquare, Square, Info } from 'lucide-react';
import type { Role } from '@/types/role';

export interface PermissionItem {
  id: string;
  label: string;
  description: string;
}

export interface PermissionGroup {
  title: string;
  permissions: PermissionItem[];
}

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    title: 'Dashboard',
    permissions: [
      { id: 'dashboard.view', label: 'View Dashboard', description: 'Can view dashboard analytics and stats' },
    ],
  },
  {
    title: 'Products',
    permissions: [
      { id: 'product.view', label: 'View Products', description: 'Can view product list and details' },
      { id: 'product.create', label: 'Create Products', description: 'Can add new products' },
      { id: 'product.update', label: 'Update Products', description: 'Can modify existing products' },
      { id: 'product.delete', label: 'Delete Products', description: 'Can delete products' },
    ],
  },
  {
    title: 'Categories',
    permissions: [
      { id: 'category.view', label: 'View Categories', description: 'Can view product categories' },
      { id: 'category.create', label: 'Create Categories', description: 'Can add new product categories' },
      { id: 'category.update', label: 'Update Categories', description: 'Can modify product categories' },
      { id: 'category.delete', label: 'Delete Categories', description: 'Can remove product categories' },
    ],
  },
  {
    title: 'Orders',
    permissions: [
      { id: 'order.view', label: 'View Orders', description: 'Can view transaction and order history' },
      { id: 'order.update', label: 'Update Orders', description: 'Can update order shipping status' },
      { id: 'order.delete', label: 'Delete Orders', description: 'Can remove order records' },
    ],
  },
  {
    title: 'Users',
    permissions: [
      { id: 'user.view', label: 'View Users', description: 'Can view administrative and customer accounts' },
      { id: 'user.create', label: 'Create Users', description: 'Can register new administrative accounts' },
      { id: 'user.update', label: 'Update Users', description: 'Can update details and role assignments' },
      { id: 'user.delete', label: 'Delete Users', description: 'Can remove administrator accounts' },
    ],
  },
  {
    title: 'Roles & Permissions',
    permissions: [
      { id: 'role.view', label: 'View Roles', description: 'Can view roles list and permissions' },
      { id: 'role.create', label: 'Create Roles', description: 'Can create new administrative roles' },
      { id: 'role.update', label: 'Update Roles', description: 'Can edit roles and adjust permissions' },
      { id: 'role.delete', label: 'Delete Roles', description: 'Can remove administrative roles' },
    ],
  },
  {
    title: 'Settings',
    permissions: [
      { id: 'settings.view', label: 'View Settings', description: 'Can view store and system settings' },
      { id: 'settings.update', label: 'Update Settings', description: 'Can modify store and system settings' },
    ],
  },
];

interface RoleFormProps {
  initialData?: Role;
  onSubmit: (data: RoleFormData) => void;
  isLoading?: boolean;
}

export function RoleForm({ initialData, onSubmit, isLoading }: RoleFormProps) {
  const isEdit = !!initialData;
  const isSuperAdmin = initialData?.name === 'Super Admin';

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      isActive: initialData ? initialData.isActive : true,
      permissions: initialData?.permissions || [],
    },
  });

  const selectedPermissions = watch('permissions') || [];

  const handlePermissionToggle = (permId: string) => {
    if (isSuperAdmin) return; // Super Admin permissions are locked

    const current = [...selectedPermissions];
    const index = current.indexOf(permId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(permId);
    }
    setValue('permissions', current, { shouldValidate: true });
  };

  const handleGroupToggle = (group: PermissionGroup) => {
    if (isSuperAdmin) return;

    const groupIds = group.permissions.map((p) => p.id);
    const allSelected = groupIds.every((id) => selectedPermissions.includes(id));

    let nextPermissions = [...selectedPermissions];
    if (allSelected) {
      // Remove all permissions in group
      nextPermissions = nextPermissions.filter((id) => !groupIds.includes(id));
    } else {
      // Add missing permissions in group
      groupIds.forEach((id) => {
        if (!nextPermissions.includes(id)) {
          nextPermissions.push(id);
        }
      });
    }
    setValue('permissions', nextPermissions, { shouldValidate: true });
  };

  const handleSelectAllGlobal = () => {
    if (isSuperAdmin) return;

    const allIds = PERMISSION_GROUPS.flatMap((g) => g.permissions.map((p) => p.id));
    const allSelected = allIds.every((id) => selectedPermissions.includes(id));

    if (allSelected) {
      setValue('permissions', [], { shouldValidate: true });
    } else {
      setValue('permissions', allIds, { shouldValidate: true });
    }
  };

  const isGroupFullySelected = (group: PermissionGroup) => {
    return group.permissions.map((p) => p.id).every((id) => selectedPermissions.includes(id));
  };

  const isGroupPartiallySelected = (group: PermissionGroup) => {
    const groupIds = group.permissions.map((p) => p.id);
    const selectedCount = groupIds.filter((id) => selectedPermissions.includes(id)).length;
    return selectedCount > 0 && selectedCount < groupIds.length;
  };

  const allPermissionsCount = PERMISSION_GROUPS.flatMap((g) => g.permissions).length;
  const isAllGlobalSelected = selectedPermissions.length === allPermissionsCount;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side: Role details */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">Role Name</Label>
              <Input
                id="name"
                disabled={isSuperAdmin}
                placeholder="e.g. Content Manager"
                {...register('name')}
                className="mt-1"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
              <Textarea
                id="description"
                placeholder="Summarize the role's purpose..."
                {...register('description')}
                className="mt-1 min-h-[100px] resize-none"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-gray-900">Active Status</p>
                <p className="text-xs text-gray-500">Allow users to log in with this role</p>
              </div>
              <button
                type="button"
                disabled={isSuperAdmin}
                onClick={() => setValue('isActive', !watch('isActive'))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  watch('isActive') ? 'bg-[#10B981]' : 'bg-gray-200'
                } ${isSuperAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    watch('isActive') ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {isSuperAdmin && (
              <div className="p-3 bg-amber-50 border border-amber-200/50 rounded-xl flex gap-2.5 text-amber-800 text-xs">
                <Info size={16} className="shrink-0 text-amber-600" />
                <p>This is the system-wide Super Admin role. Its name, status, and permissions are locked to prevent service disruption.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Permission Matrix */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Shield size={18} className="text-[#10B981]" />
                  Permission Matrix
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Select accessible modules for this role</p>
              </div>

              {!isSuperAdmin && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAllGlobal}
                  className="text-xs border-[#10B981]/30 text-[#047857] hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {isAllGlobalSelected ? 'Deselect All' : 'Select All'}
                </Button>
              )}
            </div>

            {errors.permissions && (
              <p className="text-xs text-red-500 font-medium bg-red-50 p-2.5 rounded-xl">
                {errors.permissions.message}
              </p>
            )}

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin">
              {PERMISSION_GROUPS.map((group) => {
                const isFullySelected = isGroupFullySelected(group);
                const isPartiallySelected = isGroupPartiallySelected(group);

                return (
                  <div key={group.title} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gray-50/70 px-4 py-3 flex items-center justify-between border-b border-gray-100">
                      <span className="font-semibold text-sm text-gray-800">{group.title}</span>
                      <button
                        type="button"
                        disabled={isSuperAdmin}
                        onClick={() => handleGroupToggle(group)}
                        className={`flex items-center gap-1.5 text-xs font-semibold ${
                          isSuperAdmin ? 'text-gray-400 cursor-not-allowed' : 'text-[#047857] hover:text-emerald-700'
                        }`}
                      >
                        {isFullySelected ? (
                          <>
                            <CheckSquare size={14} />
                            Deselect Group
                          </>
                        ) : (
                          <>
                            <Square size={14} />
                            Select Group
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-white">
                      {group.permissions.map((perm) => {
                        const isSelected = selectedPermissions.includes(perm.id);

                        return (
                          <div
                            key={perm.id}
                            onClick={() => handlePermissionToggle(perm.id)}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-50/30 border-[#10B981]/30 hover:bg-emerald-50/50 shadow-[0_2px_10px_-4px_rgba(16,185,129,0.1)]'
                                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/30'
                            } ${isSuperAdmin ? 'pointer-events-none' : ''}`}
                          >
                            <div className="mt-0.5">
                              {isSelected ? (
                                <div className="w-4.5 h-4.5 bg-[#10B981] rounded text-white flex items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-3 h-3"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-4.5 h-4.5 border border-gray-300 rounded" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-900 leading-tight">
                                {perm.label}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">
                                {perm.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[100px]">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isEdit ? (
            'Save Changes'
          ) : (
            'Create Role'
          )}
        </Button>
      </div>
    </form>
  );
}
