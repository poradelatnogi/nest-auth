import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { NestAuthService } from './nest-auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto, SignUpDto } from './dto';
import { NestAuth } from './nest-auth.entity';
import { JwtService } from '@nestjs/jwt';

export type GetUserWithTokenType = ReturnType<
  NestAuthTypeOrmService['getUserWithTokens']
>;

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

  async signIn(signInDto: SignInDto): Promise<GetUserWithTokenType> {
    const { email, password } = signInDto;

    const user = await this.nestAuthRepository.findOne({ where: { email } });
    const isMatched = await NestAuthTypeOrmService.comparePassword(
      password,
      user?.password,
    );
    if (!isMatched) throw new BadRequestException('BAD_CREDENTIALS');

    return this.getUserWithTokens(user);
  }

  async signUp(signUpDto: SignUpDto): Promise<GetUserWithTokenType> {
    const { email, password } = signUpDto;

    const userExists = await this.nestAuthRepository.findOne({
      where: { email },
    });
    if (userExists) throw new BadRequestException('ALREADY_EXISTS');
    signUpDto.password = await NestAuthTypeOrmService.encryptPassword(password);
    const user = await this.nestAuthRepository.create(signUpDto);

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
