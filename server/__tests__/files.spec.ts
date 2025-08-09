import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';
import path from 'path';
import fs from 'fs';

const app = createApp();
let server: any;

describe('Files API', () => {
  beforeAll(()=>{ server = app.listen(); });
  afterAll(()=>{ server.close(); });

  it('uploads, lists, downloads and deletes a file', async () => {
    const tmp = path.join(process.cwd(), 'public', 'robots.txt');
    const upload = await request(server)
      .post('/api/files/upload')
      .attach('file', tmp)
      .field('userId','user-1')
      .expect(200);
    const id = upload.body.data.id;
    const list = await request(server).get('/api/files').expect(200);
    expect(list.body.data.find((f: any)=>f.id===id)).toBeTruthy();
    const dl = await request(server).get(`/api/files/${id}`).expect(200);
    expect(dl.headers['content-type']).toBeTruthy();
    const del = await request(server).delete(`/api/files/${id}`).expect(200);
    expect(del.body.success).toBe(true);
  });
});


