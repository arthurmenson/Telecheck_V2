import { Router } from 'express';
import multer from 'multer';
import { filesRepo } from './service';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/files/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: 'No file' });
  const saved = filesRepo.save({
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    buffer: req.file.buffer,
    ownerId: String(req.body.userId || 'user-1'),
  });
  res.json({ success: true, data: { id: saved.id, originalName: saved.originalName, size: saved.size, mimeType: saved.mimeType, uploadedAt: saved.uploadedAt } });
});

router.get('/files', (_req, res) => {
  res.json({ success: true, data: filesRepo.list() });
});

router.get('/files/:id', (req, res) => {
  const f = filesRepo.get(req.params.id);
  if (!f) return res.status(404).end();
  res.setHeader('Content-Type', f.mimeType);
  res.send(f.buffer);
});

router.delete('/files/:id', (req, res) => {
  const ok = filesRepo.delete(req.params.id);
  res.json({ success: ok });
});

export default router;


