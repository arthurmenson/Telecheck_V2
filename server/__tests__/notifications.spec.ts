import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

const app = createApp();
let server: any;

describe('Notifications API', () => {
  beforeAll(()=>{ server = app.listen(); });
  afterAll(()=>{ server.close(); });

  it('creates and lists notifications in repo via preferences update as placeholder', async () => {
    // Since we do not have an explicit create endpoint, simulate by updating prefs and expecting empty list
    const userId = 'user-1';
    await request(server).put('/api/notifications/preferences').send({ userId, email: true }).expect(200);
    const list = await request(server).get('/api/notifications').query({ userId }).expect(200);
    expect(Array.isArray(list.body.data)).toBe(true);
  });
});


