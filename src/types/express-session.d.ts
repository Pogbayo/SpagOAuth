// src/types/express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      name?: string;
      email?: string;
      picture?: string;
      twitterId?:string;
      username?:string;
    };
    refreshToken?: string;
  }
}

