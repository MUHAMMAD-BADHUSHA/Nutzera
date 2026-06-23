'use client';

import { AccessDenied } from '@/components/admin/AccessDenied';

export default function AccessDeniedPage() {
  return (
    <div className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <AccessDenied />
    </div>
  );
}
