import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema<any>, where: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const input = where === 'body' ? req.body : where === 'query' ? req.query : req.params;
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        details: parsed.error.flatten(),
      });
    }
    // attach parsed data for downstream
    if (where === 'body') req.body = parsed.data;
    if (where === 'query') req.query = parsed.data as any;
    if (where === 'params') req.params = parsed.data as any;
    next();
  };
}


