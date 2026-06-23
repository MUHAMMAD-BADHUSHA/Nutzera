"use client"

import { Suspense, useState, useMemo } from "react"
import {
  Search, Shield, MoreHorizontal, Plus, Edit, Trash2,
  ShieldCheck, Mail, Lock, UserCog,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createAdminSchema, updateAdminSchema } from "@/validations/admin-user.schema"
import { useAdmins, useCreateAdmin, useUpdateAdmin, useDeleteAdmin } from "@/hooks/useAdmins"
import { useRoles } from "@/hooks/useRoles"
import { PermissionGuard } from "@/components/admin/PermissionGuard"
import { useAuth } from "@/lib/auth-context"
import type { AdminUser } from "@/types/admin-user"

export default function AdminUsersPage() {
  return (
    <PermissionGuard permission="user.view">
      <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
        <AdminUsersContent />
      </Suspense>
    </PermissionGuard>
  )
}

function AdminUsersContent() {
  const [search, setSearch] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { user: currentUser } = useAuth()
  const { data: admins, isLoading } = useAdmins()
  const { data: rolesResponse } = useRoles({ page: 1, limit: 100 })
  const createMutation = useCreateAdmin()
  const updateMutation = useUpdateAdmin()
  const deleteMutation = useDeleteAdmin()

  const roles = rolesResponse?.data || []

  const isSuperAdmin = currentUser?.role === "superadmin" || currentUser?.role === "Super Admin"
  const canCreate = isSuperAdmin || currentUser?.permissions?.includes("user.create")
  const canUpdate = isSuperAdmin || currentUser?.permissions?.includes("user.update")
  const canDelete = isSuperAdmin || currentUser?.permissions?.includes("user.delete")

  const filtered = useMemo(() => {
    if (!admins) return []
    const q = search.toLowerCase()
    return admins.filter(
      (a) =>
        a.email.toLowerCase().includes(q) ||
        (a as any).firstName?.toLowerCase().includes(q) ||
        (a as any).lastName?.toLowerCase().includes(q)
    )
  }, [admins, search])

  const openCreate = () => { setSelectedAdmin(null); setIsFormOpen(true) }
  const openEdit = (admin: AdminUser) => { setSelectedAdmin(admin); setIsFormOpen(true) }

  const handleSubmit = async (data: any) => {
    try {
      if (selectedAdmin) {
        await updateMutation.mutateAsync({ id: selectedAdmin._id, data })
        toast.success("Admin user updated successfully")
      } else {
        await createMutation.mutateAsync(data)
        toast.success("Admin user created successfully")
      }
      setIsFormOpen(false)
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save admin user")
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteMutation.mutateAsync(deleteId)
      toast.success("Admin user deleted successfully")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete admin user")
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
          <p className="text-sm text-gray-500 mt-1">Manage administrator accounts and role assignments</p>
        </div>
        {canCreate && (
          <Button
            onClick={openCreate}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/10"
          >
            <Plus size={18} className="mr-1.5" />
            Add Admin User
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all bg-white"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-1/3" />
              </div>
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <UserCog size={48} className="mx-auto text-gray-300 mb-4 stroke-[1.5]" />
          <h3 className="font-semibold text-gray-900 mb-1">No admin users found</h3>
          <p className="text-sm text-gray-500">
            {search ? "Try adjusting your search" : "Create your first admin user to get started"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Permissions</th>
                  {(canUpdate || canDelete) && (
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {filtered.map((admin) => {
                  const roleName = admin.roleId?.name || (admin.role === "superadmin" ? "Super Admin" : "Admin")
                  const permissions = admin.roleId?.permissions || (admin.role === "superadmin" ? ["All Access"] : [])
                  const isPrimary = admin.email === "admin@nutzera.in"

                  return (
                    <tr key={admin._id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#064E3B]/10 flex items-center justify-center text-sm font-bold text-[#10B981] flex-shrink-0">
                            {admin.email.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{admin.email.split("@")[0]}</p>
                            <p className="text-xs text-gray-400">{admin.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#065F46]">
                          <Shield size={11} />
                          {roleName}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={admin.isActive ? "success" : "secondary"}>
                          {admin.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1 flex-wrap max-w-[260px]">
                          {permissions.slice(0, 3).map((p) => (
                            <span key={p} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">
                              {p}
                            </span>
                          ))}
                          {permissions.length > 3 && (
                            <span className="px-1.5 py-0.5 bg-emerald-50 text-[#047857] rounded text-[10px] font-bold">
                              +{permissions.length - 3}
                            </span>
                          )}
                          {permissions.length === 0 && (
                            <span className="text-xs text-gray-400 italic">No permissions</span>
                          )}
                        </div>
                      </td>
                      {(canUpdate || canDelete) && (
                        <td className="px-5 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                                <MoreHorizontal size={16} />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36">
                              {canUpdate && (
                                <DropdownMenuItem onClick={() => openEdit(admin)}>
                                  <Edit size={14} className="mr-2" /> Edit User
                                </DropdownMenuItem>
                              )}
                              {canDelete && !isPrimary && currentUser?.id !== admin._id && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => setDeleteId(admin._id)}
                                    className="text-red-600 focus:bg-red-50 focus:text-red-700"
                                  >
                                    <Trash2 size={14} className="mr-2" /> Delete
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/30">
            <p className="text-xs text-gray-400">
              Showing {filtered.length} of {admins?.length ?? 0} admin users
            </p>
          </div>
        </div>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6">
          <DialogHeader className="border-b border-gray-100 pb-3 mb-4">
            <DialogTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="text-[#10B981]" size={20} />
              {selectedAdmin ? "Edit Admin User" : "Add Admin User"}
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              {selectedAdmin
                ? "Update access credentials and security role."
                : "Create a new administrator account with a role assignment."}
            </DialogDescription>
          </DialogHeader>

          <AdminUserForm
            key={selectedAdmin?._id ?? "new"}
            initialData={selectedAdmin ?? undefined}
            roles={roles}
            onSubmit={handleSubmit}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Admin User</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the administrator account and revoke their access immediately. This action cannot be undone.
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
  )
}

// ─── Form Component ────────────────────────────────────────────────────────────

interface AdminUserFormProps {
  initialData?: AdminUser
  roles: any[]
  onSubmit: (data: any) => void
  isLoading?: boolean
}

function AdminUserForm({ initialData, roles, onSubmit, isLoading }: AdminUserFormProps) {
  const isEdit = !!initialData
  const isPrimary = initialData?.email === "admin@nutzera.in"

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(isEdit ? updateAdminSchema : createAdminSchema),
    defaultValues: {
      email: initialData?.email ?? "",
      password: "",
      roleId: initialData?.roleId?._id ?? "",
      isActive: initialData ? initialData.isActive : true,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
        <div className="relative mt-1">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            id="email"
            type="email"
            disabled={isPrimary}
            placeholder="admin@company.com"
            {...register("email")}
            className="pl-10 rounded-xl border-gray-200 focus:border-[#10B981] focus:ring-[#10B981]/20"
          />
        </div>
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message as string}</p>}
      </div>

      <div>
        <Label htmlFor="password" className="text-gray-700 font-medium">
          Password{" "}
          {isEdit && <span className="text-xs text-gray-400 font-normal">(Leave blank to keep current)</span>}
        </Label>
        <div className="relative mt-1">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="pl-10 rounded-xl border-gray-200 focus:border-[#10B981] focus:ring-[#10B981]/20"
          />
        </div>
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message as string}</p>}
      </div>

      <div>
        <Label htmlFor="roleId" className="text-gray-700 font-medium">Assigned Role</Label>
        <select
          id="roleId"
          disabled={isPrimary}
          {...register("roleId")}
          className="mt-1 block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all bg-white"
        >
          <option value="">Select a role...</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>{role.name}</option>
          ))}
        </select>
        {errors.roleId && <p className="text-xs text-red-500 mt-1">{errors.roleId.message as string}</p>}
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
        <div>
          <p className="text-sm font-semibold text-gray-900">Active Status</p>
          <p className="text-xs text-gray-500">Allow this user to sign in</p>
        </div>
        <button
          type="button"
          disabled={isPrimary}
          onClick={() => setValue("isActive", !watch("isActive"))}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            watch("isActive") ? "bg-[#10B981]" : "bg-gray-200"
          } ${isPrimary ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${watch("isActive") ? "translate-x-6" : "translate-x-1"}`} />
        </button>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2.5"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
        ) : isEdit ? "Save Changes" : "Create Admin User"}
      </Button>
    </form>
  )
}
