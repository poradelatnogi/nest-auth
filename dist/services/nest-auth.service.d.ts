import { JwtService } from '@nestjs/jwt';
import { PasswordNewDto, PasswordResetDto, SignInDto, SignUpDto } from '../dto';
export declare class NestAuthService {
    protected jwtService: JwtService;
    constructor(jwtService: JwtService);
    signIn(signInDto: SignInDto, ...[]: any[]): Promise<any>;
    signUp(signUpDto: SignUpDto, ...[]: any[]): Promise<any>;
    passwordReset(passwordResetDto: PasswordResetDto, ...[]: any[]): Promise<any>;
    passwordNew(passwordNewDto: PasswordNewDto, ...[]: any[]): Promise<any>;
    strategyCallback(strategy: string, profile: any, ...[]: any[]): Promise<any>;
    generateResetPasswordToken(email: string, expiresIn?: string): string;
    verifyResetPasswordToken(email: string, token: string): Promise<boolean>;
    static encryptPassword(password: string): Promise<string>;
    static comparePassword(hashToCompare: string, expectedHash: string): Promise<any>;
}
//# sourceMappingURL=nest-auth.service.d.ts.map