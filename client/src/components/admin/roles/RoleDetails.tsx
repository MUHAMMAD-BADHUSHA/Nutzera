'use client';

import { Shield, Check } from 'lucide-react';
import type { Role } from '@/types/role';
import { PERMISSION_GROUPS } from './RoleForm';
import { Badge } from '@/components/ui/badge';

interface RoleDetailsProps {
  role: Role;
}

export function RoleDetails({ role }: RoleDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-2xl space-y-2 border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#10B981]/15 text-[#10B981] rounded-xl flex items-center justify-center">
            <Shield size={20} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">{role.name}</h4>
            <p className="text-xs text-gray-400">Created on {new Date(role.createdAt).toLocaleDateString()}</p>
          </div>
          <Badge variant={role.isActive ? 'success' : 'secondary'} className="ml-auto">
            {role.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 pl-13 pt-1 border-t border-gray-200/50">{role.description}</p>
      </div>

      <div className="space-y-3">
        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Assigned Permissions</h5>

        <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1 scrollbar-thin">
          {PERMISSION_GROUPS.map((group) => {
            const assignedInGroup = group.permissions.filter((p) => role.permissions.includes(p.id));

            if (assignedInGroup.length === 0) return null;

            return (
              <div key={group.title} className="border border-gray-100 rounded-xl p-3 bg-white space-y-2 shadow-sm">
                <span className="text-xs font-bold text-gray-800">{group.title}</span>
                <div className="flex flex-wrap gap-2">
                  {assignedInGroup.map((perm) => (
                    <span
                      key={perm.id}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50/60 text-[#065F46] border border-emerald-100/50"
                    >
                      <Check size={12} className="text-[#10B981] shrink-0" />
                      {perm.label}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
