import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { NestAuthService } from './nest-auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordNewDto, PasswordResetDto, SignInDto, SignUpDto } from './dto';
import { NestAuth } from './nest-auth.entity';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';

export type GetUserWithTokenType = ReturnType<
  NestAuthTypeOrmService['getUserWithTokens']
>;

@Injectable()
export class NestAuthTypeOrmService extends NestAuthService {
  constructor(
    @InjectRepository(NestAuth)
    private readonly nestAuthRepository: Repository<NestAuth>,
    @Inject(JwtService)
    jwtService: JwtService,
  ) {
    super(jwtService);
  }

  async signIn(signInDto: SignInDto): Promise<GetUserWithTokenType> {
    const { email, password } = signInDto;

    const user = await this.findUserByEmail(email);
    const isMatched = await NestAuthTypeOrmService.comparePassword(
      password,
      user?.password,
    );
    if (!isMatched) throw new BadRequestException('BAD_CREDENTIALS');

    return this.getUserWithTokens(user);
  }

  async signUp(signUpDto: SignUpDto): Promise<GetUserWithTokenType> {
    const { email, password } = signUpDto;

    const userExists = await this.findUserByEmail(email);
    if (userExists) throw new BadRequestException('ALREADY_EXISTS');
    signUpDto.password = await NestAuthTypeOrmService.encryptPassword(password);
    const user = await this.nestAuthRepository.create(signUpDto);

    return this.getUserWithTokens(user);
  }

  async passwordReset({ email }: PasswordResetDto): Promise<void> {
    const user = await this.findUserByEmail(email);
    if (!user) throw new BadRequestException('IS_NOT_EXISTS');
    const token = this.generateResetPasswordToken(email);
    user.resetPasswordToken = token;
    await this.nestAuthRepository.save(user);
  }

  async passwordNew({
    resetPasswordToken,
    password,
  }: PasswordNewDto): Promise<void> {
    const user = await this.nestAuthRepository.findOne({
      where: { resetPasswordToken },
    });
    const isValid = await this.verifyResetPasswordToken(
      user?.email,
      resetPasswordToken,
    );
    if (!isValid) throw new BadRequestException('TOKEN_INVALID');

    user.password = await NestAuthTypeOrmService.encryptPassword(password);
    user.resetPasswordToken = null;
    await this.nestAuthRepository.save(user);
  }

  async strategyCallback(strategy: string, profile: any) {
    const signUpDto = await this.cleanProfilePayload(strategy, profile);

    let user = await this.findUserByEmail(signUpDto.email);
    if (!user) user = await this.nestAuthRepository.create(signUpDto);

    return this.getUserWithTokens(user);
  }

  protected async cleanProfilePayload(
    strategy: string,
    profile: any,
  ): Promise<SignUpDto & Record<any, any>> {
    const password = crypto.randomBytes(12).toString('hex');
    return {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      password: await NestAuthTypeOrmService.encryptPassword(password),
    };
  }

  protected getUserWithTokens({ id, email }: NestAuth) {
    const payload = { id, email };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
      user: payload,
    };
  }

  private async findUserByEmail(email): Promise<NestAuth> {
    return this.nestAuthRepository.findOne({
      where: { email },
    });
  }
}
