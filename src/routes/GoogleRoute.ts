import { Router } from 'express';
import { handleGoogleCallback, logout, redirectToGoogle } from '../controllers/GoogleController';

const router = Router();

router.get('/auth/google', redirectToGoogle);
router.get('/auth/google/callback', handleGoogleCallback);
router.get('/logout', logout);

export default router;
