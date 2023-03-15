import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { GoogleStrategyOptions } from './google.options';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(options: GoogleStrategyOptions) {
    const { clientID, clientSecret, callbackURL } = options;
    super({
      clientID,
      clientSecret,
      callbackURL: callbackURL || '/google/callback',
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
