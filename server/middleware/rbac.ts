import { Request, Response, NextFunction } from 'express';

export function requireRole(..._roles: string[]) {
  return (_req: Request, _res: Response, next: NextFunction) => {
    next();
  };
}

export function requirePermission(_permission: string) {
  return (_req: Request, _res: Response, next: NextFunction) => {
    next();
  };
}


