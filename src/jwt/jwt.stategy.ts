import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Inject, Injectable} from '@nestjs/common';
import {NestAuthOptionsDto} from "../dto/nest-auth-options.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      @Inject('NEST_AUTH_OPTIONS')
      { jwtStrategyOptions }: NestAuthOptionsDto
  ) {
    const { secretOrKey, extractJWT } = jwtStrategyOptions;
    const extractors = [ExtractJwt.fromAuthHeaderAsBearerToken()];
    if (typeof extractJWT === "function") extractors.unshift(extractJWT);
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
