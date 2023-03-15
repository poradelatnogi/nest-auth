import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtStrategyOptions } from './jwt.options';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(options: JwtStrategyOptions) {
    const { secretOrKey, extractJWT } = options;
    const extractors = [ExtractJwt.fromAuthHeaderAsBearerToken()];
    if (typeof extractJWT === 'function') extractors.unshift(extractJWT);
    super({
      jwtFromRequest: ExtractJwt.fromExtractors(extractors),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  validate(payload: { id: string; email: string }) {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
