import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

const app = createApp();
let server: any;

describe('RPM + CCM integrated flows and billing', () => {
  beforeAll(() => {
    server = app.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should validate RPM and CCM criteria and generate dual-billing codes', async () => {
    const patientId = 'p1';
    const month = '2025-08';

    // RPM: enroll + consent + setup
    await request(server).post('/api/rpm/enroll').send({ patientId, deviceType: 'BP' }).expect(200);
    await request(server).post('/api/rpm/consent').send({ patientId }).expect(200);
    await request(server).post('/api/rpm/setup').send({ patientId }).expect(200);

    // RPM: add 16 days in month
    for (let d = 1; d <= 16; d++) {
      const day = String(d).padStart(2, '0');
      await request(server).post('/api/rpm/data-day').send({ patientId, date: `${month}-${day}` }).expect(200);
    }

    // RPM: time logs totaling 40 minutes (should be 99457 + one 99458 unit)
    await request(server).post('/api/rpm/time-log').send({ patientId, date: `${month}-05`, minutes: 25, role: 'staff' }).expect(200);
    await request(server).post('/api/rpm/time-log').send({ patientId, date: `${month}-10`, minutes: 15, role: 'physician' }).expect(200);

    // CCM: enroll + consent + add 2 conditions
    await request(server).post('/api/ccm/enroll').send({ patientId }).expect(200);
    await request(server).post('/api/ccm/consent').send({ patientId }).expect(200);
    await request(server).post('/api/ccm/condition').send({ patientId, condition: 'diabetes' }).expect(200);
    await request(server).post('/api/ccm/condition').send({ patientId, condition: 'hypertension' }).expect(200);

    // CCM: time logs totaling 45 minutes (=> 99490 + one 99439; and 99491 if physician >= 30)
    await request(server).post('/api/ccm/time-log').send({ patientId, date: `${month}-08`, minutes: 25, role: 'staff' }).expect(200);
    await request(server).post('/api/ccm/time-log').send({ patientId, date: `${month}-12`, minutes: 20, role: 'physician' }).expect(200);
    await request(server).post('/api/ccm/time-log').send({ patientId, date: `${month}-20`, minutes: 15, role: 'physician' }).expect(200);

    // Validate RPM
    const rpmVal = await request(server).get('/api/rpm/validate').query({ patientId, month }).expect(200);
    expect(rpmVal.body.data.eligible99454).toBe(true);
    expect(rpmVal.body.data.eligible99457).toBe(true);
    expect(rpmVal.body.data.eligible99458Units).toBeGreaterThanOrEqual(1);

    // Validate CCM
    const ccmVal = await request(server).get('/api/ccm/validate').query({ patientId, month }).expect(200);
    expect(ccmVal.body.data.eligible99490).toBe(true);
    expect(ccmVal.body.data.eligible99439Units).toBeGreaterThanOrEqual(1);
    expect(ccmVal.body.data.eligible99491).toBe(true);

    // Generate billing codes
    const billing = await request(server).post('/api/billing/generate').send({ patientId, month }).expect(200);
    const codes = billing.body.data.codes.map((c: any) => c.code);
    expect(codes).toContain('99454');
    expect(codes).toContain('99457');
    expect(codes).toContain('99458');
    expect(codes).toContain('99490');
    expect(codes).toContain('99439');
    expect(codes).toContain('99491');
  });
});


