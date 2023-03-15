import { Request } from 'express';
export interface JwtStrategyOptions {
    secretOrKey: string;
    extractJWT?: (req: Request) => string | null;
}
//# sourceMappingURL=jwt.options.d.ts.map