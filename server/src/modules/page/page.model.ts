import mongoose, { Document, Schema } from 'mongoose';

export interface IPage extends Document {
  title: string;
  slug: string;
  description: string;
  bannerImage: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogImage: string;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const pageSchema = new Schema<IPage>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    bannerImage: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
    seoKeywords: {
      type: [String],
      default: [],
    },
    ogImage: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

pageSchema.index({ slug: 1 });
pageSchema.index({ status: 1 });

export const Page = mongoose.model<IPage>('Page', pageSchema);
