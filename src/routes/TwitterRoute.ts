import express from 'express';
import { startTwitterAuth, twitterCallback } from '../controllers/twitterController';

const router = express.Router();

router.get('/auth/twitter', startTwitterAuth);
router.get('/auth/twitter/callback', twitterCallback);

export default router;
