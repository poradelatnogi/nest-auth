import { Request } from 'express';

export class ExtractFromCookies {
  static extract(req: Request): string | null {
    if (req.cookies && 'access_token' in req.cookies) {
      return req.cookies.access_token;
    }
    return null;
  }
}
