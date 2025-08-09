import { Router } from 'express';
import { notificationsRepo } from './service';

const router = Router();

router.get('/notifications', (req, res) => {
  const userId = String(req.query.userId || 'user-1');
  res.json({ success: true, data: notificationsRepo.list(userId) });
});
router.post('/notifications/:id/read', (req, res) => {
  const userId = String(req.body.userId || 'user-1');
  const ok = notificationsRepo.markRead(userId, req.params.id);
  res.json({ success: ok });
});
router.post('/notifications/mark-all-read', (req, res) => {
  const userId = String(req.body.userId || 'user-1');
  const count = notificationsRepo.markAllRead(userId);
  res.json({ success: true, data: { count } });
});
router.put('/notifications/preferences', (req, res) => {
  const userId = String(req.body.userId || 'user-1');
  const prefs = notificationsRepo.updatePreferences(userId, req.body);
  res.json({ success: true, data: prefs });
});
router.post('/notifications/subscribe', (_req, res) => {
  // Stub: would store device tokens/endpoints
  res.json({ success: true });
});

export default router;


