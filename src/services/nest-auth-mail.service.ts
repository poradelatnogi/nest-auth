import { Injectable, Logger } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NestAuthMailService {
  constructor(protected readonly mailerService: MailerService) {}

  async sendResetPassword(options: ISendMailOptions) {
    try {
      options.subject ||= 'Reset password token';
      options.template ||= 'emails/reset-password';
      await this.mailerService.sendMail({ ...options });
    } catch (e) {
      Logger.error(e);
    }
  }
}
