import { JwtModuleOptions } from '@nestjs/jwt';
import { extractJWT } from '../jwt.extractor';

export class NextAuthOptionsDto {
  jwtModule: JwtModuleOptions;
  strategies: {
    jwt?: {
      jwtFromRequest: typeof extractJWT;
      ignoreExpiration: boolean;
      secretOrKey: string;
    };
    google?: {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
    };
    microsoft?: {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
      tenant: string;
    };
  };
}
