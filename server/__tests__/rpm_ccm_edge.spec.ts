import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

const app = createApp();
let server: any;

describe('RPM/CCM edge cases', () => {
  beforeAll(() => { server = app.listen(); });
  afterAll(() => { server.close(); });

  it('RPM: not eligible without 16 data days or 20 min time', async () => {
    const patientId = 'p-edge-rpm';
    const month = '2025-08';
    await request(server).post('/api/rpm/enroll').send({ patientId }).expect(200);
    await request(server).post('/api/rpm/consent').send({ patientId }).expect(200);
    await request(server).post('/api/rpm/setup').send({ patientId }).expect(200);
    for (let d=1; d<=10; d++) {
      const day = String(d).padStart(2,'0');
      await request(server).post('/api/rpm/data-day').send({ patientId, date: `${month}-${day}` }).expect(200);
    }
    await request(server).post('/api/rpm/time-log').send({ patientId, date: `${month}-05`, minutes: 10, role: 'staff' }).expect(200);
    const res = await request(server).get('/api/rpm/validate').query({ patientId, month }).expect(200);
    expect(res.body.data.eligible99454).toBe(false);
    expect(res.body.data.eligible99457).toBe(false);
  });

  it('CCM: requires >=2 conditions and >=20 minutes', async () => {
    const patientId = 'p-edge-ccm';
    const month = '2025-08';
    await request(server).post('/api/ccm/enroll').send({ patientId }).expect(200);
    await request(server).post('/api/ccm/consent').send({ patientId }).expect(200);
    await request(server).post('/api/ccm/condition').send({ patientId, condition: 'diabetes' }).expect(200);
    await request(server).post('/api/ccm/time-log').send({ patientId, date: `${month}-03`, minutes: 15, role: 'staff' }).expect(200);
    const res = await request(server).get('/api/ccm/validate').query({ patientId, month }).expect(200);
    expect(res.body.data.eligible99490).toBe(false);
  });
});


