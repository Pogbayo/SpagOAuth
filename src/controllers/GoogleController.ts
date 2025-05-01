import { Request, Response } from 'express';
import { client } from '../utils/googleClient';

export const redirectToGoogle = (req: Request, res: Response) => {
    const url = client.generateAuthUrl({
        access_type: 'offline',
        prompt: "consent",
        scope: [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email'
        ],
        redirect_uri: process.env.GOOGLE_REDIRECT_URI 
      });
    
      res.redirect(url);
};


export const logout = (req: Request, res: Response): void => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send("Couldn't log out.");
      }
      res.redirect('/');
    });
  };

export const handleGoogleCallback = async (req: Request, res: Response):Promise<void> => {
  const code = req.query.code as string | undefined;
  const queryError = req.query.error;

  if (queryError) {
    console.error('Google returned an error in query:', queryError);
    return res.redirect('/auth/google?error=' + queryError);
  }

  if (!code) {
     res.status(400).send('Authorization code is missing');
     return
  }

  try {
    const { tokens } = await client.getToken(code);
    req.session.refreshToken = tokens.refresh_token ?? undefined;

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token || '',
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    req.session.user = {
      name: payload?.name,
      email: payload?.email,
      picture: payload?.picture,
    };

    return res.redirect('/');
  } catch (error: any) {
    console.error('Google Auth Error:', error);

    if (error?.message?.includes('Token used too late')) {
      return res.redirect('/auth/google?error=token_expired');
    }

     res.status(500).send('Internal Server Error');
     return
  }
};

