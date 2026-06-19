import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await AuthService.findAdminByEmail(email);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await AuthService.comparePassword(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = AuthService.generateToken(admin);

    const { password: _, ...adminWithoutPassword } = admin.toObject();

    return res.json({
      user: adminWithoutPassword,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};