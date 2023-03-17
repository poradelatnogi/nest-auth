import { DynamicModule, Module } from '@nestjs/common';
import { NestAuthService } from './services/nest-auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { NestAuthMailService } from './services/nest-auth-mail.service';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';

@Module({})
export class NestAuthModule {
  static register(options: { mailerOptions: MailerOptions }): DynamicModule {
    return {
      module: NestAuthModule,
      imports: [
        JwtModule.register({}),
        MailerModule.forRoot(options.mailerOptions),
      ],
      providers: [NestAuthService, NestAuthMailService, JwtService],
      exports: [NestAuthService, NestAuthMailService, JwtService],
    };
  }
}
