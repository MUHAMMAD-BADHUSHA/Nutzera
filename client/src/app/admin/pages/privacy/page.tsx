'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageForm } from '@/components/admin/pages/PageForm';
import { usePages, useCreatePage, useUpdatePage } from '@/hooks/usePages';
import type { PageFormData } from '@/validations/page.schema';
import type { Page } from '@/types/page';

const SLUG = 'privacy-policy';

export default function EditPrivacyPage() {
  const router = useRouter();
  const [existingPage, setExistingPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  const { data } = usePages({ limit: 50 });
  const createPage = useCreatePage();
  const updatePage = useUpdatePage();

  useEffect(() => {
    if (data?.data) {
      const found = data.data.find((p) => p.slug === SLUG);
      setExistingPage(found || null);
      setLoading(false);
    }
  }, [data]);

  const handleSubmit = async (formData: PageFormData) => {
    try {
      if (existingPage) {
        await updatePage.mutateAsync({ id: existingPage._id, data: formData });
        toast.success('Privacy Policy page updated successfully');
      } else {
        await createPage.mutateAsync({ ...formData, slug: SLUG });
        toast.success('Privacy Policy page created successfully');
      }
      router.push('/admin/pages');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save page');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={24} className="animate-spin text-[#10B981]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/pages')}>
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Edit the Privacy Policy page content</p>
        </div>
      </div>

      <PageForm
        page={existingPage || undefined}
        onSubmit={handleSubmit}
        isLoading={createPage.isPending || updatePage.isPending}
      />
    </div>
  );
}
