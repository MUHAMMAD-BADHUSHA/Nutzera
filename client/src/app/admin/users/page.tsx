"use client"

import { Suspense, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Users as UsersIcon, Shield, MoreHorizontal, Activity, Plus, Edit, Trash2, Eye, ShieldCheck, Mail, Lock } from "lucide-react"
import { customers } from "@/lib/admin-data"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { Modal } from "@/components/admin/Modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createAdminSchema, updateAdminSchema, type CreateAdminFormData, type UpdateAdminFormData } from "@/validations/admin-user.schema"
import { useAdmins, useCreateAdmin, useUpdateAdmin, useDeleteAdmin } from "@/hooks/useAdmins"
import { useRoles } from "@/hooks/useRoles"
import { PermissionGuard } from "@/components/admin/PermissionGuard"
import { useAuth } from "@/lib/auth-context"
import type { User } from "@/types/admin"
import type { AdminUser } from "@/types/admin-user"

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500 mt-1">Manage customers and administrators</p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading...</div>}>
        <UsersContent />
      </Suspense>
    </div>
  )
}

function UsersContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "customers"
  const [search, setSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null)
  
  // Admin form and dialog state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null)
  const [deleteAdminId, setDeleteAdminId] = useState<string | null>(null)

  const { user: currentUser } = useAuth()
  const { data: admins, isLoading: isAdminsLoading } = useAdmins()
  const { data: rolesResponse } = useRoles({ page: 1, limit: 100 })
  const createAdminMutation = useCreateAdmin()
  const updateAdminMutation = useUpdateAdmin()
  const deleteAdminMutation = useDeleteAdmin()

  const roles = rolesResponse?.data || []

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  )

  const filteredAdmins = useMemo(() => {
    if (!admins) return []
    return admins.filter((a) =>
      a.email.toLowerCase().includes(search.toLowerCase())
    )
  }, [admins, search])

  const handleOpenCreateAdmin = () => {
    setSelectedAdmin(null)
    setIsFormOpen(true)
  }

  const handleOpenEditAdmin = (admin: AdminUser) => {
    setSelectedAdmin(admin)
    setIsFormOpen(true)
  }

  const handleAdminFormSubmit = async (formData: any) => {
    try {
      if (selectedAdmin) {
        await updateAdminMutation.mutateAsync({
          id: selectedAdmin._id,
          data: formData,
        })
        toast.success("Administrator updated successfully")
      } else {
        await createAdminMutation.mutateAsync(formData)
        toast.success("Administrator created successfully")
      }
      setIsFormOpen(false)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save administrator")
    }
  }

  const handleDeleteAdmin = async () => {
    if (!deleteAdminId) return
    try {
      await deleteAdminMutation.mutateAsync(deleteAdminId)
      toast.success("Administrator deleted successfully")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete administrator")
    } finally {
      setDeleteAdminId(null)
    }
  }

  const canCreateUser = currentUser?.role === "superadmin" || currentUser?.role === "Super Admin" || currentUser?.permissions?.includes("user.create")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
          <a
            href="/admin/users"
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              tab === "customers" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <UsersIcon size={16} />
            Customers
          </a>
          <a
            href="/admin/users?tab=admins"
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              tab === "admins" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Shield size={16} />
            Admin Users
          </a>
        </div>

        {tab === "admins" && canCreateUser && (
          <Button onClick={handleOpenCreateAdmin} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/10">
            <Plus size={18} className="mr-1.5" />
            Add Admin User
          </Button>
        )}
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${tab === "customers" ? "customers" : "admin users"}...`}
          className="w-full max-w-md pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all bg-white"
        />
      </div>

      {tab === "customers" ? (
        <CustomersTable customers={filteredCustomers} onSelect={setSelectedCustomer} />
      ) : (
        <AdminUsersTable
          admins={filteredAdmins}
          isLoading={isAdminsLoading}
          onEdit={handleOpenEditAdmin}
          onDelete={setDeleteAdminId}
        />
      )}

      {/* Customer details modal */}
      <Modal open={!!selectedCustomer} onClose={() => setSelectedCustomer(null)} title="Customer Details" size="lg">
        {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
      </Modal>

      {/* Admin Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6">
          <DialogHeader className="border-b border-gray-100 pb-3 mb-4">
            <DialogTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="text-[#10B981]" size={20} />
              {selectedAdmin ? "Edit Admin User" : "Add Admin User"}
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              {selectedAdmin ? "Update access credentials and security clearances." : "Register a new administrative account."}
            </DialogDescription>
          </DialogHeader>

          <AdminUserForm
            initialData={selectedAdmin || undefined}
            roles={roles}
            onSubmit={handleAdminFormSubmit}
            isLoading={createAdminMutation.isPending || updateAdminMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Admin delete alert dialog */}
      <AlertDialog open={!!deleteAdminId} onOpenChange={() => setDeleteAdminId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Admin User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this administrator account? They will lose access to the panel immediately. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAdmin} className="bg-red-600 hover:bg-red-700 text-white rounded-lg">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function CustomersTable({ customers, onSelect }: { customers: User[]; onSelect: (c: User) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Joined</th>
              <th className="text-right px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Orders</th>
              <th className="text-right px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Total Spent</th>
              <th className="text-right px-5 py-3.5 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#064E3B]/10 flex items-center justify-center text-sm font-medium text-[#10B981]">
                      {customer.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-400">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-700">{customer.role}</td>
                <td className="px-5 py-4"><StatusBadge status={customer.status} variant="user" /></td>
                <td className="px-5 py-4 text-gray-500">{customer.joined}</td>
                <td className="px-5 py-4 text-right font-medium">{customer.orders}</td>
                <td className="px-5 py-4 text-right font-medium">${customer.totalSpent.toFixed(2)}</td>
                <td className="px-5 py-4 text-right">
                  <button onClick={() => onSelect(customer)} className="p-2 text-gray-400 hover:text-[#10B981] hover:bg-emerald-50 rounded-lg transition-all">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface AdminUsersTableProps {
  admins: AdminUser[]
  isLoading: boolean
  onEdit: (admin: AdminUser) => void
  onDelete: (id: string) => void
}

function AdminUsersTable({ admins, isLoading, onEdit, onDelete }: AdminUsersTableProps) {
  const { user: currentUser } = useAuth()

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
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
    )
  }

  const canEditUser = currentUser?.role === "superadmin" || currentUser?.role === "Super Admin" || currentUser?.permissions?.includes("user.update")
  const canDeleteUser = currentUser?.role === "superadmin" || currentUser?.role === "Super Admin" || currentUser?.permissions?.includes("user.delete")

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Permissions</th>
              {(canEditUser || canDeleteUser) && (
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            {admins.map((user) => {
              const roleName = user.roleId?.name || (user.role === 'superadmin' ? 'Super Admin' : 'Admin');
              const permissions = user.roleId?.permissions || (user.role === 'superadmin' ? ['All Access'] : []);
              const isPrimarySuperAdmin = user.email === 'admin@nutzera.in';

              return (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#064E3B]/10 flex items-center justify-center text-sm font-semibold text-[#10B981]">
                        {user.email.split("@")[0].substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.email.split("@")[0]}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#10B981]/10 text-[#065F46] capitalize">
                      <Shield size={12} />
                      {roleName}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={user.isActive ? "success" : "secondary"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1 flex-wrap max-w-xs md:max-w-md">
                      {permissions.slice(0, 3).map((perm) => (
                        <span key={perm} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">
                          {perm}
                        </span>
                      ))}
                      {permissions.length > 3 && (
                        <span className="px-1.5 py-0.5 bg-emerald-50 text-[#047857] rounded text-[10px] font-bold">
                          +{permissions.length - 3} more
                        </span>
                      )}
                      {permissions.length === 0 && (
                        <span className="text-xs text-gray-400 italic">No permissions</span>
                      )}
                    </div>
                  </td>
                  {(canEditUser || canDeleteUser) && (
                    <td className="px-5 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                            <MoreHorizontal size={16} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          {canEditUser && (
                            <DropdownMenuItem onClick={() => onEdit(user)}>
                              <Edit size={14} className="mr-2" />
                              Edit User
                            </DropdownMenuItem>
                          )}
                          {canDeleteUser && !isPrimarySuperAdmin && currentUser?.id !== user._id && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => onDelete(user._id)}
                                className="text-red-600 focus:bg-red-50 focus:text-red-700"
                              >
                                <Trash2 size={14} className="mr-2" />
                                Delete User
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
    </div>
  )
}

function CustomerDetails({ customer }: { customer: User }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#10B981] to-[#064E3B] flex items-center justify-center text-white text-lg font-bold">
          {customer.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{customer.name}</h4>
          <p className="text-sm text-gray-500">{customer.email}</p>
          <p className="text-xs text-gray-400">Member since {customer.joined}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-white border border-gray-100 rounded-xl">
          <p className="text-xs text-gray-500">Total Orders</p>
          <p className="text-xl font-bold text-gray-900">{customer.orders}</p>
        </div>
        <div className="p-3 bg-white border border-gray-100 rounded-xl">
          <p className="text-xs text-gray-500">Total Spent</p>
          <p className="text-xl font-bold text-gray-900">${customer.totalSpent.toFixed(2)}</p>
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">Activity Log</p>
        <div className="space-y-2">
          {[
            { action: "Placed order ORD-008", time: "2 hours ago" },
            { action: "Updated profile", time: "1 day ago" },
            { action: "Added review", time: "3 days ago" },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <Activity size={14} className="text-gray-300" />
              <span className="text-gray-700">{log.action}</span>
              <span className="text-xs text-gray-400 ml-auto">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Form component for creating and updating admin accounts
interface AdminUserFormProps {
  initialData?: AdminUser
  roles: any[]
  onSubmit: (data: any) => void
  isLoading?: boolean
}

function AdminUserForm({ initialData, roles, onSubmit, isLoading }: AdminUserFormProps) {
  const isEdit = !!initialData
  const isPrimarySuperAdmin = initialData?.email === "admin@nutzera.in"

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? updateAdminSchema : createAdminSchema),
    defaultValues: {
      email: initialData?.email || "",
      password: "",
      roleId: initialData?.roleId?._id || "",
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
            disabled={isPrimarySuperAdmin}
            placeholder="name@nutzera.com"
            {...register("email")}
            className="pl-10 rounded-xl border-gray-200 focus:border-[#10B981] focus:ring-[#10B981]/20"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="text-gray-700 font-medium">
          Password {isEdit && <span className="text-xs text-gray-400 font-normal">(Leave blank to keep current)</span>}
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
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message as string}</p>
        )}
      </div>

      <div>
        <Label htmlFor="roleId" className="text-gray-700 font-medium">Clearance Role</Label>
        <select
          id="roleId"
          disabled={isPrimarySuperAdmin}
          {...register("roleId")}
          className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all bg-white"
        >
          <option value="">Select a role...</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.roleId && (
          <p className="text-xs text-red-500 mt-1">{errors.roleId.message as string}</p>
        )}
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
        <div>
          <p className="text-sm font-semibold text-gray-900">Active Status</p>
          <p className="text-xs text-gray-500">Allow this user to authenticate</p>
        </div>
        <button
          type="button"
          disabled={isPrimarySuperAdmin}
          onClick={() => setValue("isActive", !watch("isActive"))}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            watch("isActive") ? "bg-[#10B981]" : "bg-gray-200"
          } ${isPrimarySuperAdmin ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              watch("isActive") ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100">
        <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white w-full rounded-xl py-2.5">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          ) : isEdit ? (
            "Save Changes"
          ) : (
            "Create User"
          )}
        </Button>
      </div>
    </form>
  )
}
