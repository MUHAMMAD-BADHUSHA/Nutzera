import { Page, IPage } from './page.model';
import {
  CreatePageInput,
  UpdatePageInput,
  PageQueryParams,
  PaginatedResponse,
} from './page.types';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export class PageService {
  static async createPage(data: CreatePageInput): Promise<IPage> {
    let slug = data.slug || generateSlug(data.title);

    const existingSlug = await Page.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    const page = new Page({ ...data, slug });
    return page.save();
  }

  static async getPages(
    params: PageQueryParams
  ): Promise<PaginatedResponse<IPage>> {
    const { page = 1, limit = 10, search, status } = params;

    const query: Record<string, any> = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Page.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Page.countDocuments(query),
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

  static async getPageBySlug(slug: string): Promise<IPage | null> {
    return Page.findOne({ slug });
  }

  static async getPageById(id: string): Promise<IPage | null> {
    return Page.findById(id);
  }

  static async updatePage(
    id: string,
    data: UpdatePageInput
  ): Promise<IPage | null> {
    const updateData: Record<string, any> = { ...data };

    if (data.title && !data.slug) {
      updateData.slug = generateSlug(data.title);
    }

    return Page.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  static async deletePage(id: string): Promise<IPage | null> {
    return Page.findByIdAndDelete(id);
  }

  static async getPageCount(): Promise<number> {
    return Page.countDocuments();
  }

  static async getPublishedPages(): Promise<IPage[]> {
    return Page.find({ status: 'published' }).sort({ createdAt: -1 }).lean();
  }

  static async seedDefaultPages(): Promise<void> {
    const defaultPages = [
      { title: 'About Us', slug: 'about', description: 'Learn about Nutzera' },
      { title: 'Privacy Policy', slug: 'privacy-policy', description: 'Our privacy policy' },
      { title: 'Terms & Conditions', slug: 'terms-and-conditions', description: 'Terms and conditions' },
      { title: 'Contact Us', slug: 'contact', description: 'Contact Nutzera' },
    ];

    for (const pageData of defaultPages) {
      const existing = await Page.findOne({ slug: pageData.slug });
      if (!existing) {
        await Page.create({ ...pageData, status: 'draft' });
      }
    }
  }
}
