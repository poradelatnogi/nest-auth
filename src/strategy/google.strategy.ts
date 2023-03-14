import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { NextAuthOptionsDto } from '../dto/next-auth-options.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('NEXT_AUTH_OPTIONS')
    { strategies }: NextAuthOptionsDto,
  ) {
    super({
      clientID: strategies.google?.clientID,
      clientSecret: strategies.google?.clientSecret,
      callbackURL: strategies.google?.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    if (!profile) done('NOT_AUTHORIZED', null);
    done(null, profile);
  }
}
