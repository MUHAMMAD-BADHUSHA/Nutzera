import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { Admin } from '../models/admin.model';

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = AuthService.verifyToken(token);
    (req as any).admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (requiredPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminPayload = (req as any).admin;
      if (!adminPayload) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // If superadmin, bypass checks
      if (adminPayload.role === 'superadmin') {
        return next();
      }

      // Check if permissions are stored in the JWT payload
      const userPermissions: string[] = adminPayload.permissions || [];
      const hasPermission = requiredPermissions.every((perm) => userPermissions.includes(perm));

      if (hasPermission) {
        return next();
      }

      // Fallback: fetch from database in case token is outdated
      const user = await Admin.findById(adminPayload.id).populate('roleId');
      if (!user || !user.isActive) {
        return res.status(403).json({ message: 'Forbidden: Account is inactive or does not exist' });
      }

      const roleObj: any = user.roleId;
      const dbPermissions: string[] = roleObj?.permissions || [];
      const hasDbPermission = requiredPermissions.every((perm) => dbPermissions.includes(perm));

      if (hasDbPermission) {
        return next();
      }

      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    } catch (error) {
      console.error('Authorization middleware error:', error);
      return res.status(500).json({ message: 'Internal server error during authorization' });
    }
  };
};