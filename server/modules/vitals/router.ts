import { Router } from 'express';

const router = Router();

router.get('/vitals');
router.post('/vitals');
router.put('/vitals/:id');
router.delete('/vitals/:id');
router.get('/vitals/trends');
router.get('/vitals/statistics');

export default router;


