import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middleware/validate';

const router = Router();

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post('/auth/register', validate(RegisterSchema));
router.post('/auth/login', validate(LoginSchema));
router.post('/auth/refresh');
router.post('/auth/logout');
router.post('/auth/verify-email');
router.post('/auth/reset-password');
router.post('/auth/change-password');

export default router;


