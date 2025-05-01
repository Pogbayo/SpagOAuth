import { NextFunction, Request, Response } from 'express';
import { generateTwitterAuthUrl,getTwitterAccessToken } from '../utils/TwitterAuth';
import axios from 'axios';

export const startTwitterAuth = (req: Request, res: Response) => {
  const url = generateTwitterAuthUrl();
  res.redirect(url);
};

export const twitterCallback = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const { code } = req.query;

  if (!code || typeof code !== 'string') {
     res.status(400).send('Code missing');
     return
  }

  try {
    const tokenData = await getTwitterAccessToken(code);
    const accessToken = tokenData.access_token;

if (!tokenData) {
    return res.redirect("/")
}

    const userResponse = await axios.get("https://api.twitter.com/2/users/me", {
        headers: {
            "Content-type" : "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

  const user = userResponse.data;

      req.session.user = {
      name: user.data.name,
      twitterId: user.data.id,
      username: user.data.username,
    };
    res.redirect('/'); 

  } catch (err) {
    console.error(err);
    res.status(500).send('Error during Twitter login');
  }
};
