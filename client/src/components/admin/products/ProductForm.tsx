'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUpload } from '@/components/common/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { productSchema, type ProductFormData } from '@/validations/product.schema';
import type { Product } from '@/types/product';
import { Save, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isLoading?: boolean;
}

const CATEGORIES = [
  'Nut Bars',
  'Chocolate Bars',
  'Fruit Bites',
  'Protein Bars',
  'Seed Mixes',
  'Dried Fruits',
  'Gift Boxes',
];

export function ProductForm({ product, onSubmit, isLoading }: ProductFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      shortDescription: product?.shortDescription || '',
      price: product?.price || 0,
      discountPrice: product?.discountPrice || 0,
      stock: product?.stock || 0,
      image: product?.image || '',
      category: product?.category || '',
    },
  });

  const image = watch('image');

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('shortDescription', product.shortDescription || '');
      setValue('price', product.price);
      setValue('discountPrice', product.discountPrice || 0);
      setValue('stock', product.stock);
      setValue('image', product.image);
      setValue('category', product.category);
    }
  }, [product, setValue]);

  const handleImageChange = (url: string) => {
    setValue('image', url, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 pb-20">
      {/* Main Content */}
      <div className="flex-1 space-y-5">
        {/* Product Information */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" placeholder="e.g. Almond Date Bar" {...register('name')} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]"
                  {...register('category')}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock *</Label>
                <Input id="stock" type="number" min="0" placeholder="0" {...register('stock', { valueAsNumber: true })} />
                {errors.stock && <p className="text-xs text-red-500">{errors.stock.message}</p>}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                placeholder="Brief product summary..."
                className="min-h-[80px] resize-none"
                {...register('shortDescription')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Detailed product description..."
                className="min-h-[120px] resize-none"
                {...register('description')}
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 space-y-5">
        {/* Product Image */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Product Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload value={image} onChange={handleImageChange} />
            {errors.image && <p className="text-xs text-red-500 mt-2">{errors.image.message}</p>}
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input id="price" type="number" step="0.01" min="0.01" placeholder="0.00" {...register('price', { valueAsNumber: true })} />
              {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountPrice">Discount Price ($)</Label>
              <Input id="discountPrice" type="number" step="0.01" min="0" placeholder="0.00" {...register('discountPrice', { valueAsNumber: true })} />
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
            onClick={() => router.push('/admin/products')}
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
            {isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </div>
    </div>
  );
}
