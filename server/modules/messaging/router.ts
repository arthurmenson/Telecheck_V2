import { Router } from 'express';
import { messagingRepo } from './service';

const router = Router();

router.get('/messaging/conversations', (req, res) => {
  const userId = String(req.query.userId || 'user-1');
  res.json({ success: true, data: messagingRepo.listConversations(userId) });
});

router.post('/messaging/send', (req, res) => {
  const { senderId = 'user-1', recipientId = 'user-2', content } = req.body;
  const r = messagingRepo.sendMessage(senderId, recipientId, content);
  res.json({ success: true, data: r });
});

router.post('/messaging/:messageId/read', (req, res) => {
  const userId = String(req.body.userId || 'user-1');
  const ok = messagingRepo.markRead(userId, req.params.messageId);
  res.json({ success: ok });
});

export default router;


