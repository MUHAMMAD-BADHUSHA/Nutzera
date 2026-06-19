import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  password: string;
  role: 'superadmin' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['superadmin', 'admin'],
      default: 'admin'
    }
  },
  {
    timestamps: true
  }
);

export const Admin = mongoose.model<IAdmin>('AdminUser', adminSchema);