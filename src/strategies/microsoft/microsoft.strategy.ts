import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { Injectable } from '@nestjs/common';
import { MicrosoftStrategyOptions } from './microsoft.options';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(options: MicrosoftStrategyOptions) {
    const { clientID, clientSecret, callbackURL, tenant } = options;
    let tenantOptions: { tenant: string; tokenURL: string } | object = {};
    if (typeof tenant === 'string') {
      tenantOptions = {
        // [Optional] The tenant for the application. Defaults to 'common'.
        // Used to construct the authorizationURL and tokenURL
        tenant,
        // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
        authorizationURL:
          'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
        tokenURL:
          'https://login.microsoftonline.com/' + tenant + '/oauth2/v2.0/token',
      };
    }
    super({
      clientID,
      clientSecret,
      callbackURL,
      prompt: 'select_account',
      scope: ['user.read'],
      // Microsoft specific options
      ...tenantOptions,
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
