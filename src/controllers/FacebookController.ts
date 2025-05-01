import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { facebookUrl } from '../utils/facebookAuth';

export const redirectToFacebook = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const url = facebookUrl();
  res.redirect(url);
}

export const handleFacebookCallback = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
   const { code } = req.query;

   try {
     const { data } = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&code=${code}&redirect_uri=${process.env.REDIRECT_URI}`);
 
     const { access_token } = data;
 
     const { data: profile } = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);
 
     res.redirect('/');
   } catch (error) {
     res.redirect('/login');
   }
}