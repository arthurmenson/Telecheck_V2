import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().transform((v) => parseInt(v, 10)).optional(),
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_ACCESS_KEY: z.string().optional(),
  S3_SECRET_KEY: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  S3_FORCE_PATH_STYLE: z.string().optional(),
  JWT_SECRET: z.string().optional(),
  REFRESH_JWT_SECRET: z.string().optional(),
  CORS_ORIGIN: z.string().optional(),
});

export const env = EnvSchema.parse(process.env);


