import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin, IAdmin } from '../models/admin.model';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!SECRET) {
  throw new Error('Please add your JWT secret to .env');
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(admin: IAdmin): string {
    return jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      SECRET,
      { expiresIn: JWT_EXPIRES_IN as any }
    );
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, SECRET);
  }

  static async findAdminByEmail(email: string) {
    return Admin.findOne({ email });
  }
}