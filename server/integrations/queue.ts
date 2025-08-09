import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

export const queues = {
  ai: new Queue('ai', { connection }),
  files: new Queue('files', { connection }),
  notifications: new Queue('notifications', { connection }),
  analytics: new Queue('analytics', { connection }),
};

export function createWorker(name: keyof typeof queues, processor: any) {
  return new Worker(name, processor, { connection });
}


