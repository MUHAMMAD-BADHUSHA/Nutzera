'use client';

import { useAuth } from '@/lib/auth-context';
import { AccessDenied } from './AccessDenied';

interface PermissionGuardProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PermissionGuard({
  permission,
  children,
  fallback,
}: PermissionGuardProps) {
  const { user } = useAuth();

  if (!user) return null;

  // Let's support both superadmin flag and the role check
  const hasAccess =
    user.role === 'superadmin' ||
    user.role === 'Super Admin' ||
    user.permissions?.includes(permission);

  if (!hasAccess) {
    return fallback !== undefined ? (fallback as any) : <AccessDenied />;
  }

  return <>{children}</>;
}
