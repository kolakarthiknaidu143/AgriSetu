import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.ts';
import { IUser, UserRole } from '../types.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'agrisetu_super_secure_jwt_secret_key_2026';

export interface AuthRequest extends Request {
  user?: IUser;
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: UserRole; email: string };
    const user = db.users.find(u => u._id === decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token: User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired authentication token.' });
  }
}

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    if (allowedRoles.includes(req.user.role) || req.user.role === 'admin') {
      return next();
    }

    return res.status(403).json({
      error: `Forbidden: Requires one of these roles: ${allowedRoles.join(', ')}`
    });
  };
}

export function generateToken(user: IUser): string {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
