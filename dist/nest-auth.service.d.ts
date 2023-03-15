import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { PasswordNewDto } from './dto/password-new.dto';
export declare class NestAuthService {
    signIn(signInDto: SignInDto, ...[]: any[]): Promise<void>;
    signUp(signUpDto: SignUpDto, ...[]: any[]): Promise<void>;
    passwordReset(passwordResetDto: PasswordResetDto, ...[]: any[]): Promise<void>;
    passwordNew(passwordNewDto: PasswordNewDto, ...[]: any[]): Promise<void>;
    strategyCallback(strategy: string, profile: any, ...[]: any[]): Promise<void>;
}
//# sourceMappingURL=nest-auth.service.d.ts.map