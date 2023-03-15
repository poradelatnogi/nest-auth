import { SignInDto, SignUpDto, PasswordResetDto, PasswordNewDto } from './dto';
export declare class NestAuthService {
    signIn(signInDto: SignInDto, ...[]: any[]): Promise<any>;
    signUp(signUpDto: SignUpDto, ...[]: any[]): Promise<any>;
    passwordReset(passwordResetDto: PasswordResetDto, ...[]: any[]): Promise<void>;
    passwordNew(passwordNewDto: PasswordNewDto, ...[]: any[]): Promise<void>;
    strategyCallback(strategy: string, profile: any, ...[]: any[]): Promise<void>;
    static encryptPassword(password: string): Promise<string>;
    static comparePassword(hashToCompare: string, expectedHash: string): Promise<any>;
}
//# sourceMappingURL=nest-auth.service.d.ts.map