import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { NestAuthService } from './nest-auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from './dto';
import { NestAuth } from './nest-auth.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NestAuthTypeOrmService extends NestAuthService {
  constructor(
    @InjectRepository(NestAuth)
    private readonly nestAuthRepository: Repository<NestAuth>,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<ReturnType<typeof this.getUserWithTokens>> {
    const { email, password } = signInDto;
    const user = await this.nestAuthRepository.findOne({ where: { email } });
    const isMatched = await NestAuthTypeOrmService.comparePassword(
      password,
      user?.password,
    );

    if (!isMatched) throw new BadRequestException('BAD_CREDENTIALS');

    return this.getUserWithTokens(user);
  }

  private getUserWithTokens({ id, email }: NestAuth) {
    const payload = { id, email };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
      user: payload,
    };
  }
}
