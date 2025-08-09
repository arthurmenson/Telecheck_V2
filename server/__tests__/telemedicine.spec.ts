import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

const app = createApp();
let server: any;

describe('Telemedicine API', () => {
  beforeAll(()=>{ server = app.listen(); });
  afterAll(()=>{ server.close(); });

  it('schedules an appointment, creates a room, and generates a summary', async () => {
    const appt = await request(server)
      .post('/api/telemedicine/schedule')
      .send({ providerId: 'provider_1', userId: 'user-1', dateTime: new Date(Date.now()+3600000).toISOString(), type: 'video', reason: 'Follow-up', duration: 20 })
      .expect(200);
    const appointmentId = appt.body.data.appointmentId;
    const room = await request(server).post('/api/telemedicine/room').send({ appointmentId }).expect(200);
    expect(room.body.data.roomId).toBeTruthy();
    const summary = await request(server).get(`/api/telemedicine/summary/${room.body.data.roomId}`).expect(200);
    expect(summary.body.data.recommendations.length).toBeGreaterThan(0);
  });

  it('triages emergency symptoms properly', async () => {
    const res = await request(server).post('/api/telemedicine/triage').send({ symptoms: ['chest pain'], vitals: { bp: '180/110' } }).expect(200);
    expect(res.body.data.urgency).toBe('emergency');
  });
});


