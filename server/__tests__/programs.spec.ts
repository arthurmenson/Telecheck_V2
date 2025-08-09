import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

const app = createApp();
let server: any;

describe('Programs API', () => {
  beforeAll(()=>{ server = app.listen(); });
  afterAll(()=>{ server.close(); });

  it('creates program, enrolls participant, returns analytics', async () => {
    const created = await request(server)
      .post('/api/ehr/programs')
      .send({ title: 'Diabetes Coaching', description: '12-week program', type: 'rolling-start', status: 'active' })
      .expect(200);
    const programId = created.body.data.id;
    await request(server).post(`/api/ehr/programs/${programId}/enroll`).send({ userId: 'user-1' }).expect(200);
    const parts = await request(server).get(`/api/ehr/programs/${programId}/participants`).expect(200);
    expect(parts.body.data.length).toBe(1);
    const analytics = await request(server).get(`/api/ehr/programs/${programId}/analytics`).expect(200);
    expect(analytics.body.data.totalParticipants).toBe(1);
  });
});


