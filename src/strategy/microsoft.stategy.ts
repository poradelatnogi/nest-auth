import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { Inject, Injectable } from '@nestjs/common';
import { NextAuthOptionsDto } from '../dto/next-auth-options.dto';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(
    @Inject('NEXT_AUTH_OPTIONS')
    { strategies }: NextAuthOptionsDto,
  ) {
    super({
      clientID: strategies.microsoft?.clientID,
      clientSecret: strategies.microsoft?.clientSecret,
      callbackURL: strategies.microsoft?.callbackURL,
      prompt: 'select_account',
      scope: ['user.read'],
      // Microsoft specific options
      // [Optional] The tenant for the application. Defaults to 'common'.
      // Used to construct the authorizationURL and tokenURL
      tenant: strategies.microsoft?.tenant,
      // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
      authorizationURL:
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
      tokenURL:
        'https://login.microsoftonline.com/' +
        strategies.microsoft?.tenant +
        '/oauth2/v2.0/token',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    if (!profile) done('NOT_AUTHORIZED', null);
    done(null, profile);
  }
}
