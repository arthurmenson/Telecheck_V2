import { Router } from 'express';

const router = Router();

router.get('/users/profile');
router.put('/users/profile');
router.put('/users/preferences');
router.post('/users/avatar');
router.delete('/users/delete');

export default router;


