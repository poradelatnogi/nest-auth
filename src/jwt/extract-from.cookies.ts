import { Request } from 'express';

export const extractFromCookies = (req: Request): string | null => {
  if (req.cookies && 'access_token' in req.cookies) {
    return req.cookies.access_token;
  }
  return null;
};
