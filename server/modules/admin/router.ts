import { Router } from 'express';

const router = Router();

router.get('/admin/users');
router.get('/admin/system-status');
router.get('/admin/settings');
router.get('/admin/audit-log');
router.post('/admin/backups');

export default router;


