import { Router } from 'express';
import { generateMonthlyCodes } from './service';

const router = Router();

router.post('/billing/generate', (req, res) => {
  const { patientId, month } = req.body;
  res.json({ success: true, data: generateMonthlyCodes(patientId, month) });
});

export default router;


