import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { NextAuthOptionsDto } from '../dto/next-auth-options.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('NEXT_AUTH_OPTIONS')
    { strategies }: NextAuthOptionsDto,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        strategies.jwt?.jwtFromRequest,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: strategies.jwt.ignoreExpiration,
      secretOrKey: strategies.jwt.secretOrKey,
    });
  }

  validate(payload: { id: string; email: string; }) {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
