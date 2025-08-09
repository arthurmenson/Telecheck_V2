import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

const app = createApp();
let server: any;

describe('Messaging API', () => {
  beforeAll(()=>{ server = app.listen(); });
  afterAll(()=>{ server.close(); });

  it('sends messages and lists conversations with unread counts', async () => {
    const senderId = 'user-1';
    const recipientId = 'user-2';
    await request(server).post('/api/messaging/send').send({ senderId, recipientId, content: 'Hello' }).expect(200);
    await request(server).post('/api/messaging/send').send({ senderId, recipientId, content: 'How are you?' }).expect(200);
    const convs = await request(server).get('/api/messaging/conversations').query({ userId: recipientId }).expect(200);
    expect(convs.body.data.length).toBeGreaterThan(0);
    const first = convs.body.data[0];
    expect(first.unread).toBeGreaterThan(0);
  });
});


