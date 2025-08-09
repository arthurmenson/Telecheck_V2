import { Router } from 'express';
import { programsRepo } from './service';

const router = Router();

router.get('/ehr/programs', (_req, res) => {
  res.json({ success: true, data: programsRepo.list() });
});
router.post('/ehr/programs', (req, res) => {
  const created = programsRepo.create(req.body);
  res.json({ success: true, data: created });
});
router.put('/ehr/programs/:id', (req, res) => {
  const updated = programsRepo.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Not found' });
  res.json({ success: true, data: updated });
});
router.delete('/ehr/programs/:id', (req, res) => {
  res.json({ success: programsRepo.remove(req.params.id) });
});
router.post('/ehr/programs/:id/enroll', (req, res) => {
  const participant = programsRepo.enroll(req.params.id, String(req.body.userId || 'user-1'));
  res.json({ success: true, data: participant });
});
router.get('/ehr/programs/:id/participants', (req, res) => {
  res.json({ success: true, data: programsRepo.listParticipants(req.params.id) });
});
router.get('/ehr/programs/:id/analytics', (req, res) => {
  res.json({ success: true, data: programsRepo.analytics(req.params.id) });
});

export default router;


