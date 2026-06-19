'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductForm } from '@/components/admin/products/ProductForm';
import { useCreateProduct } from '@/hooks/useProducts';
import type { ProductFormData } from '@/validations/product.schema';

export default function CreateProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await createProduct.mutateAsync(data);
      toast.success('Product created successfully');
      router.push('/admin/products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <Button variant="ghost" size="icon" onClick={() => router.push('/admin/products')}>
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Create Product</h1>
          <p className="text-sm text-gray-500">Add a new product to your catalog</p>
        </div>
      </div>

      <ProductForm onSubmit={handleSubmit} isLoading={createProduct.isPending} />
    </div>
  );
}
