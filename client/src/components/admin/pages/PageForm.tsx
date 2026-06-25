'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUpload } from '@/components/common/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RichTextEditor } from './RichTextEditor';
import { pageSchema, type PageFormData } from '@/validations/page.schema';
import type { Page } from '@/types/page';
import { Save, ArrowLeft, X, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PageFormProps {
  page?: Page;
  onSubmit: (data: PageFormData) => Promise<void>;
  isLoading?: boolean;
}

export function PageForm({ page, onSubmit, isLoading }: PageFormProps) {
  const router = useRouter();
  const [keywordInput, setKeywordInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: page?.title || '',
      slug: page?.slug || '',
      description: page?.description || '',
      bannerImage: page?.bannerImage || '',
      content: page?.content || '',
      seoTitle: page?.seoTitle || '',
      seoDescription: page?.seoDescription || '',
      seoKeywords: page?.seoKeywords || [],
      ogImage: page?.ogImage || '',
      status: page?.status || 'draft',
    },
  });

  const bannerImage = watch('bannerImage');
  const ogImage = watch('ogImage');
  const seoKeywords = watch('seoKeywords') || [];
  const title = watch('title');

  useEffect(() => {
    if (page) {
      setValue('title', page.title);
      setValue('slug', page.slug);
      setValue('description', page.description || '');
      setValue('bannerImage', page.bannerImage || '');
      setValue('content', page.content || '');
      setValue('seoTitle', page.seoTitle || '');
      setValue('seoDescription', page.seoDescription || '');
      setValue('seoKeywords', page.seoKeywords || []);
      setValue('ogImage', page.ogImage || '');
      setValue('status', page.status);
    }
  }, [page, setValue]);

  useEffect(() => {
    if (title && !page) {
      const autoSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', autoSlug);
    }
  }, [title, page, setValue]);

  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !seoKeywords.includes(trimmed)) {
      setValue('seoKeywords', [...seoKeywords, trimmed]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setValue(
      'seoKeywords',
      seoKeywords.filter((k) => k !== keyword)
    );
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 pb-20">
      {/* Main Content */}
      <div className="flex-1 space-y-5">
        {/* Page Information */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Page Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" placeholder="e.g. About Us" {...register('title')} />
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" placeholder="e.g. about-us" {...register('slug')} />
              {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                placeholder="Brief page description..."
                className="min-h-[80px] resize-none"
                {...register('description')}
              />
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]"
                {...register('status')}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Page Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  content={field.value || ''}
                  onChange={field.onChange}
                  placeholder="Write your page content here..."
                />
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 space-y-5">
        {/* Banner Image */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Banner Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              value={bannerImage}
              onChange={(url) => setValue('bannerImage', url)}
            />
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input
                id="seoTitle"
                placeholder="Page title for search engines"
                {...register('seoTitle')}
              />
              <p className="text-[10px] text-gray-400">
                {watch('seoTitle')?.length || 0}/200 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Textarea
                id="seoDescription"
                placeholder="Page description for search engines"
                className="min-h-[80px] resize-none"
                {...register('seoDescription')}
              />
              <p className="text-[10px] text-gray-400">
                {watch('seoDescription')?.length || 0}/500 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label>SEO Keywords</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add keyword"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeywordKeyDown}
                />
                <Button type="button" variant="outline" size="icon" onClick={addKeyword}>
                  <Plus size={16} />
                </Button>
              </div>
              {seoKeywords.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {seoKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#10B981]/10 text-[#10B981] rounded-lg text-xs"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Open Graph Image</Label>
              <ImageUpload
                value={ogImage}
                onChange={(url) => setValue('ogImage', url)}
              />
              <p className="text-[10px] text-gray-400">
                Recommended: 1200x630px
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push('/admin/pages')}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="gap-2"
          >
            <Save size={16} />
            {isLoading ? 'Saving...' : page ? 'Update Page' : 'Create Page'}
          </Button>
        </div>
      </div>
    </div>
  );
}
