import { Request, Response, NextFunction } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // Placeholder – implement JWT verification
  next();
}

export function optionalAuth(_req: Request, _res: Response, next: NextFunction) {
  // Placeholder – attach user if present
  next();
}


