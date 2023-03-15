import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { NestAuthOptionsDto } from './dto/nest-auth-options.dto';
import { JwtStrategy } from './jwt/jwt.stategy';
import { GoogleStrategy } from './google/google.strategy';
import { MicrosoftStrategy } from './microsoft/microsoft.strategy';
import { NestAuthService } from './nest-auth.service';

@Module({})
export class NestAuthModule {
  static register(options: NestAuthOptionsDto): DynamicModule {
    const {
      jwtModuleOptions,
      microsoftStrategyOptions,
      googleStrategyOptions,
    } = options;
    const strategies = [];
    if (!googleStrategyOptions) strategies.push(GoogleStrategy);
    if (!microsoftStrategyOptions) strategies.push(MicrosoftStrategy);
    return {
      module: NestAuthModule,
      imports: [JwtModule.register(jwtModuleOptions)],
      providers: [
        {
          provide: 'NEST_AUTH_OPTIONS',
          useValue: options,
        },
        NestAuthService,
        JwtStrategy,
        ...strategies,
      ],
      exports: [NestAuthService, JwtStrategy, ...strategies],
    };
  }
}
