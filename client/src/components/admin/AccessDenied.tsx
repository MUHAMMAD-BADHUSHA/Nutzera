'use client';

import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function AccessDenied() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-red-500/10 rounded-full blur-2xl w-24 h-24 mx-auto" />
        <div className="relative w-20 h-20 bg-gradient-to-br from-red-500/20 to-rose-600/10 rounded-2xl border border-red-500/30 flex items-center justify-center text-red-500 mx-auto animate-bounce-slow">
          <ShieldAlert size={40} className="stroke-[1.5]" />
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        Access Denied
      </h1>
      <p className="text-gray-500 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        You do not have the required permissions to access this page. Please contact your system administrator if you think this is a mistake.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-xs sm:max-w-none">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Go Back
        </Button>
        <Button
          onClick={() => router.push('/admin')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/10 transition-colors"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
