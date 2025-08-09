import IORedis from 'ioredis';

export const redis = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

export async function cacheGet<T = any>(key: string): Promise<T | null> {
  const v = await redis.get(key);
  return v ? JSON.parse(v) : null;
}

export async function cacheSet(key: string, value: any, ttlSeconds?: number) {
  const payload = JSON.stringify(value);
  if (ttlSeconds) {
    await redis.set(key, payload, 'EX', ttlSeconds);
  } else {
    await redis.set(key, payload);
  }
}


