import { Request } from 'express';

export class JwtStrategyOptionsDto {
  extractJWT?: (req: Request) => string | null;
  secretOrKey: string;
}
