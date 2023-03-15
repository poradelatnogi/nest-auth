import { NestAuthService } from './nest-auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { PasswordNewDto } from './dto/password-new.dto';
import { Request } from 'express';
export declare class NestAuthController {
    private readonly nestAuthService;
    protected constructor(nestAuthService: NestAuthService);
    signIn(signInDto: SignInDto, ...[]: any[]): Promise<any>;
    signUp(signUpDto: SignUpDto, ...[]: any[]): Promise<any>;
    passwordReset(passwordResetDto: PasswordResetDto): Promise<any>;
    passwordNew(passwordNewDto: PasswordNewDto): Promise<any>;
    google(): Promise<void>;
    googleCallback(req: Request): Promise<void>;
    microsoft(): Promise<void>;
    microsoftCallback(req: Request): Promise<void>;
}
//# sourceMappingURL=nest-auth.controller.d.ts.map