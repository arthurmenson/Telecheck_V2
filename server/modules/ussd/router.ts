import { Router } from 'express';

// Africa's Talking USSD webhook expects form-encoded POSTs with fields like:
// sessionId, serviceCode, phoneNumber, text

const router = Router();

router.post('/ussd/inbound', (req, res) => {
  // Parse inbound; in production ensure body parser for urlencoded
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  // Simple demo menu
  // text examples: '' (first hit), '1', '2*1', etc.
  const steps = String(text || '').split('*').filter(Boolean);
  let response = '';
  let end = false;

  if (steps.length === 0) {
    response = 'CON Welcome to Telecheck Health\n1. Talk to a nurse\n2. Order medicine\n3. Health check questions\n0. Exit';
  } else if (steps[0] === '1') {
    response = 'END A nurse will call you within 15 minutes. Thank you!';
    end = true;
  } else if (steps[0] === '2') {
    if (steps.length === 1) {
      response = 'CON Select medicine\n1. Metformin 500mg\n2. Insulin\n0. Back';
    } else if (steps[1] === '1') {
      response = 'END Metformin order confirmed. Delivery in 2-3 days.';
      end = true;
    } else if (steps[1] === '2') {
      response = 'END A clinician will contact you to confirm insulin details.';
      end = true;
    } else {
      response = 'END Thank you!';
      end = true;
    }
  } else if (steps[0] === '3') {
    response = 'END We will send you a brief health check via SMS.';
    end = true;
  } else {
    response = 'END Thank you!';
    end = true;
  }

  res.set('Content-Type', 'text/plain');
  res.send(response);
});

export default router;


