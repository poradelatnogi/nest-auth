import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
export declare class NestAuthMailService {
    protected readonly mailerService: MailerService;
    constructor(mailerService: MailerService);
    sendResetPassword(options: ISendMailOptions): Promise<void>;
}
//# sourceMappingURL=nest-auth-mail.service.d.ts.map