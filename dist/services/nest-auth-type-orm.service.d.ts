import { NestAuthService } from './nest-auth.service';
import { NestAuth } from '../entities/nest-auth.entity';
import { Repository } from 'typeorm';
import { PasswordNewDto, PasswordResetDto, SignInDto, SignUpDto } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { NestAuthMailService } from './nest-auth-mail.service';
export declare class NestAuthTypeOrmService extends NestAuthService {
    protected readonly nestAuthRepository: Repository<NestAuth>;
    protected readonly nestAuthMailerService: NestAuthMailService;
    constructor(nestAuthRepository: Repository<NestAuth>, jwtService: JwtService, nestAuthMailerService: NestAuthMailService);
    signIn(signInDto: SignInDto, ...[]: any[]): Promise<GetUserWithTokenType>;
    signUp(signUpDto: SignUpDto, ...[]: any[]): Promise<GetUserWithTokenType>;
    passwordReset({ email }: PasswordResetDto, ...[]: any[]): Promise<void>;
    passwordNew({ resetPasswordToken, password }: PasswordNewDto, ...[]: any[]): Promise<void>;
    strategyCallback(strategy: string, profile: any, ...[]: any[]): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
        };
    }>;
    protected cleanProfilePayload(strategy: string, profile: any): Promise<SignUpDto & Record<any, any>>;
    protected getUserWithTokens({ id, email }: NestAuth): {
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
        };
    };
    private findUserByEmail;
}
export type GetUserWithTokenType = ReturnType<NestAuthTypeOrmService['getUserWithTokens']>;
//# sourceMappingURL=nest-auth-type-orm.service.d.ts.map