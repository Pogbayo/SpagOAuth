import { Router } from 'express';
import { handleFacebookCallback, redirectToFacebook } from '../controllers/FacebookController';

const router = Router();

router.get("/auth/facebook",redirectToFacebook);
router.get("/auth/facebook/callback",handleFacebookCallback);

export default router;