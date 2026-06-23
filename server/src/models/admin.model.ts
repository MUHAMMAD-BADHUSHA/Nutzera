import mongoose, { Document, Schema } from 'mongoose';

export type AdminStatus = 'active' | 'inactive' | 'suspended';

export interface IAdmin extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  profileImage?: string;
  role: 'superadmin' | 'admin';
  roleId?: mongoose.Types.ObjectId;
  status: AdminStatus;
  isActive: boolean;
  lastLogin?: Date;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    profileImage: { type: String },
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: false },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'AdminUser', required: false },
  },
  { timestamps: true }
);

export const Admin = mongoose.model<IAdmin>('AdminUser', adminSchema);