import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { NestAuthOptionsDto } from '../dto/nest-auth-options.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('NEST_AUTH_OPTIONS')
    { googleStrategyOptions }: NestAuthOptionsDto,
  ) {
    const { clientID, clientSecret, callbackURL } = googleStrategyOptions;
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
