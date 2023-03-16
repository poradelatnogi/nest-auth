import { SignInDto, SignUpDto, PasswordResetDto, PasswordNewDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
export declare class NestAuthService {
    readonly jwtService: JwtService;
    readonly mailerService: MailerService;
    constructor(jwtService: JwtService, mailerService: MailerService, ...[]: any[]);
    signIn(signInDto: SignInDto, ...[]: any[]): Promise<any>;
    signUp(signUpDto: SignUpDto, ...[]: any[]): Promise<any>;
    passwordReset(passwordResetDto: PasswordResetDto, ...[]: any[]): Promise<any>;
    passwordNew(passwordNewDto: PasswordNewDto, ...[]: any[]): Promise<any>;
    strategyCallback(strategy: string, profile: any, ...[]: any[]): Promise<any>;
    static encryptPassword(password: string): Promise<string>;
    static comparePassword(hashToCompare: string, expectedHash: string): Promise<any>;
    generateResetPasswordToken(email: string, expiresIn?: string): string;
    verifyResetPasswordToken(email: string, token: string): Promise<boolean>;
    sendResetPassword(options: {
        to: string;
        from?: string;
        subject?: string;
        template?: string;
        context: Record<any, any>;
    }): Promise<void>;
}
//# sourceMappingURL=nest-auth.service.d.ts.map