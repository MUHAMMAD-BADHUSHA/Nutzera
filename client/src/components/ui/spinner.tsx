import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function Spinner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-center', className)} {...props}>
      <Loader2 className="h-6 w-6 animate-spin text-[#10B981]" />
    </div>
  );
}

export { Spinner };
