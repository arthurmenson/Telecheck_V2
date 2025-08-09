import { Router } from 'express';
import { africasTalking } from '../../integrations/africasTalking';

const router = Router();

// Outbound
router.post('/sms/send', async (req, res) => {
  const { to, message } = req.body;
  const result = await africasTalking.sendSMS(to, message);
  res.json({ success: true, data: result });
});

// Inbound (optional; depends on short code and AT setup)
router.post('/sms/inbound', (req, res) => {
  // Handle inbound SMS webhook from Africa's Talking
  // Typically includes: from, to, text, date, id
  // For now, just 200 OK
  res.json({ success: true });
});

export default router;


