import { Router } from 'express';
import { enroll, consent, addCondition, logTime, validateMonth, getState } from './service';

const router = Router();

router.post('/ccm/enroll', (req, res) => {
  const { patientId } = req.body;
  res.json({ success: true, data: enroll(patientId) });
});

router.post('/ccm/consent', (req, res) => {
  const { patientId, at } = req.body;
  res.json({ success: true, data: consent(patientId, at) });
});

router.post('/ccm/condition', (req, res) => {
  const { patientId, condition } = req.body;
  res.json({ success: true, data: addCondition(patientId, condition) });
});

router.post('/ccm/time-log', (req, res) => {
  const { patientId, date, minutes, role } = req.body;
  const m = logTime(patientId, date, minutes, role);
  res.json({ success: true, data: { month: m.month, timeByRoleMinutes: m.timeByRoleMinutes } });
});

router.get('/ccm/validate', (req, res) => {
  const patientId = String(req.query.patientId);
  const month = String(req.query.month);
  res.json({ success: true, data: validateMonth(patientId, month) });
});

router.get('/ccm/state', (req, res) => {
  const patientId = String(req.query.patientId);
  const month = String(req.query.month);
  res.json({ success: true, data: getState(patientId, month) });
});

export default router;


