import { Product, IProduct } from './product.model';
import {
  CreateProductInput,
  UpdateProductInput,
  ProductQueryParams,
  PaginatedResponse,
} from './product.types';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export class ProductService {
  static async createProduct(data: CreateProductInput): Promise<IProduct> {
    let slug = generateSlug(data.name);

    const existingSlug = await Product.findOne({ slug, isDeleted: false });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    const product = new Product({ ...data, slug });
    return product.save();
  }

  static async getProducts(
    params: ProductQueryParams
  ): Promise<PaginatedResponse<IProduct>> {
    const { page = 1, limit = 10, search, category, isActive } = params;

    const query: Record<string, any> = { isDeleted: false };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (isActive !== undefined) {
      query.isActive = isActive;
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getProductById(id: string): Promise<IProduct | null> {
    return Product.findOne({ _id: id, isDeleted: false });
  }

  static async updateProduct(
    id: string,
    data: UpdateProductInput
  ): Promise<IProduct | null> {
    const updateData: Record<string, any> = { ...data };

    if (data.name) {
      updateData.slug = generateSlug(data.name);
    }

    return Product.findOneAndUpdate(
      { _id: id, isDeleted: false },
      updateData,
      { new: true, runValidators: true }
    );
  }

  static async deleteProduct(id: string): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
  }

  static async toggleStatus(id: string): Promise<IProduct | null> {
    const product = await Product.findOne({ _id: id, isDeleted: false });
    if (!product) return null;

    product.isActive = !product.isActive;
    return product.save();
  }

  static async getProductCount(): Promise<number> {
    return Product.countDocuments({ isDeleted: false });
  }

  static async getActiveProductCount(): Promise<number> {
    return Product.countDocuments({ isDeleted: false, isActive: true });
  }

  static async getCategories(): Promise<string[]> {
    const categories = await Product.distinct('category', { isDeleted: false });
    return categories;
  }
}
