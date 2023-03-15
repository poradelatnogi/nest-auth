import { NestAuthService } from './nest-auth.service';
import { Repository } from 'typeorm';
import { SignInDto, SignUpDto } from './dto';
import { NestAuth } from './nest-auth.entity';
import { JwtService } from '@nestjs/jwt';
export type GetUserWithTokenType = ReturnType<NestAuthTypeOrmService['getUserWithTokens']>;
export declare class NestAuthTypeOrmService extends NestAuthService {
    private readonly nestAuthRepository;
    private readonly jwtService;
    constructor(nestAuthRepository: Repository<NestAuth>, jwtService: JwtService);
    signIn(signInDto: SignInDto): Promise<GetUserWithTokenType>;
    signUp(signUpDto: SignUpDto): Promise<GetUserWithTokenType>;
    private getUserWithTokens;
}
//# sourceMappingURL=nest-auth-type-orm.service.d.ts.map