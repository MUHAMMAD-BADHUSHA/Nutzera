import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  password: string;
  role: 'superadmin' | 'admin';
  roleId?: mongoose.Types.ObjectId;
  isActive: boolean;
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
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Admin = mongoose.model<IAdmin>('AdminUser', adminSchema);