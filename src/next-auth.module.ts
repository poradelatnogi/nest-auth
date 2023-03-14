import { Module, DynamicModule } from '@nestjs/common';
import { NextAuthOptionsDto } from './dto/next-auth-options.dto';
import { NextAuthController } from './next-auth.controller';
import { JwtStrategy } from './strategy/jwt.stategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { MicrosoftStrategy } from './strategy/microsoft.stategy';
import { JwtModule } from '@nestjs/jwt';

@Module({})
export class NextAuthModule {
  static register(options: NextAuthOptionsDto): DynamicModule {
    return {
      module: NextAuthModule,
      imports: [JwtModule.register(options.jwtModule)],
      providers: [
        {
          provide: 'NEXT_AUTH_OPTIONS',
          useValue: options,
        },
        JwtStrategy,
        GoogleStrategy,
        MicrosoftStrategy,
      ],
      controllers: [NextAuthController],
    };
  }
}
