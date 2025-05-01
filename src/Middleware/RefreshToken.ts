import { Request, Response, NextFunction } from 'express';
import { client } from '../utils/googleClient';

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.session.refreshToken &&
    client.credentials?.expiry_date &&
    client.credentials.expiry_date < Date.now()
  ) {
    try {
      client.setCredentials({
        refresh_token: req.session.refreshToken,
      });
      const { credentials } = await client.refreshAccessToken();
      client.setCredentials(credentials);
    } catch (error) {
      console.error('Token refresh error:', error);
    }
  }
  next();
};
