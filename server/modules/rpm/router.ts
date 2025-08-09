import { Router } from 'express';
import { enroll, consent, completeSetup, logDataDay, logTime, validateMonth, getState } from './service';

const router = Router();

router.post('/rpm/enroll', (req, res) => {
  const { patientId, deviceType } = req.body;
  res.json({ success: true, data: enroll(patientId, deviceType) });
});

router.post('/rpm/consent', (req, res) => {
  const { patientId, at } = req.body;
  res.json({ success: true, data: consent(patientId, at) });
});

router.post('/rpm/setup', (req, res) => {
  const { patientId, at } = req.body;
  res.json({ success: true, data: completeSetup(patientId, at) });
});

router.post('/rpm/data-day', (req, res) => {
  const { patientId, date } = req.body; // YYYY-MM-DD
  const m = logDataDay(patientId, date);
  res.json({ success: true, data: { month: m.month, dataDays: Array.from(m.dataDays) } });
});

router.post('/rpm/time-log', (req, res) => {
  const { patientId, date, minutes, role } = req.body; // role: 'staff' | 'physician'
  const m = logTime(patientId, date, minutes, role);
  res.json({ success: true, data: { month: m.month, timeByRoleMinutes: m.timeByRoleMinutes } });
});

router.get('/rpm/validate', (req, res) => {
  const patientId = String(req.query.patientId);
  const month = String(req.query.month); // YYYY-MM
  res.json({ success: true, data: validateMonth(patientId, month) });
});

router.get('/rpm/state', (req, res) => {
  const patientId = String(req.query.patientId);
  const month = String(req.query.month);
  res.json({ success: true, data: getState(patientId, month) });
});

export default router;


