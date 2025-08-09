import { Router } from 'express';

const router = Router();

router.get('/analytics/dashboard');
router.get('/analytics/reports');
router.post('/analytics/export');
router.post('/analytics/custom');
router.get('/analytics/population-health');

export default router;


