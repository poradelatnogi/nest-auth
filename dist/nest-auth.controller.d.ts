import { NestAuthService } from './services/nest-auth.service';
import { PasswordNewDto, PasswordResetDto, SignInDto, SignUpDto } from './dto';
import { Request } from 'express';
export declare class NestAuthController {
    protected readonly nestAuthService: NestAuthService;
    constructor(nestAuthService: NestAuthService);
    signIn(signInDto: SignInDto, ...[]: any[]): Promise<any>;
    signUp(signUpDto: SignUpDto, ...[]: any[]): Promise<any>;
    passwordReset(passwordResetDto: PasswordResetDto, ...[]: any[]): Promise<any>;
    passwordNew(passwordNewDto: PasswordNewDto, ...[]: any[]): Promise<any>;
    google(...[]: any[]): Promise<void>;
    googleCallback(req: Request & {
        user?: any;
    }, ...[]: any[]): Promise<any>;
    microsoft(...[]: any[]): Promise<void>;
    microsoftCallback(req: Request & {
        user?: any;
    }, ...[]: any[]): Promise<any>;
}
//# sourceMappingURL=nest-auth.controller.d.ts.map