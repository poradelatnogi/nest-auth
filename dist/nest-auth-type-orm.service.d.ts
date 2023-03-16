import { NestAuthService } from './nest-auth.service';
import { Repository } from 'typeorm';
import { PasswordNewDto, PasswordResetDto, SignInDto, SignUpDto } from './dto';
import { NestAuth } from './nest-auth.entity';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
export type GetUserWithTokenType = ReturnType<NestAuthTypeOrmService['getUserWithTokens']>;
export declare class NestAuthTypeOrmService extends NestAuthService {
    private readonly nestAuthRepository;
    constructor(nestAuthRepository: Repository<NestAuth>, jwtService: JwtService, mailerService: MailerService);
    signIn(signInDto: SignInDto): Promise<GetUserWithTokenType>;
    signUp(signUpDto: SignUpDto): Promise<GetUserWithTokenType>;
    passwordReset({ email }: PasswordResetDto): Promise<void>;
    passwordNew({ resetPasswordToken, password, }: PasswordNewDto): Promise<void>;
    strategyCallback(strategy: string, profile: any): Promise<{
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
//# sourceMappingURL=nest-auth-type-orm.service.d.ts.map