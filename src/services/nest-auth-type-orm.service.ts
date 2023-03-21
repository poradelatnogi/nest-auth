import { BadRequestException, Injectable } from '@nestjs/common';
import { NestAuthService } from './nest-auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { NestAuth } from '../nest-auth.entity';
import { Repository } from 'typeorm';
import { PasswordNewDto, PasswordResetDto, SignInDto, SignUpDto } from '../dto';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';
import { NestAuthMailService } from './nest-auth-mail.service';

@Injectable()
export class NestAuthTypeOrmService extends NestAuthService {
  constructor(
    @InjectRepository(NestAuth)
    protected readonly nestAuthRepository: Repository<NestAuth>,
    jwtService: JwtService,
    protected readonly nestAuthMailerService: NestAuthMailService,
  ) {
    super(jwtService);
  }

  async signIn(
    signInDto: SignInDto,
    ...[]: any[]
  ): Promise<GetUserWithTokenType> {
    const { email, password } = signInDto;

    const user = await this.findUserByEmail(email);
    if (!user) throw new BadRequestException('IS_NOT_EXISTS');
    const isMatched = await NestAuthTypeOrmService.comparePassword(
      password,
      user.password,
    );
    if (!isMatched) throw new BadRequestException('BAD_CREDENTIALS');

    return this.getUserWithTokens(user);
  }

  async signUp(
    signUpDto: SignUpDto,
    ...[]: any[]
  ): Promise<GetUserWithTokenType> {
    const { email, password } = signUpDto;

    const userExists = await this.findUserByEmail(email);
    if (userExists) throw new BadRequestException('ALREADY_EXISTS');
    signUpDto.password = await NestAuthTypeOrmService.encryptPassword(password);

    const entity = this.nestAuthRepository.create(signUpDto);
    const user = await this.nestAuthRepository.manager.save(entity);

    return this.getUserWithTokens(user);
  }

  async passwordReset(
    { email }: PasswordResetDto,
    ...[]: any[]
  ): Promise<void> {
    const user = await this.findUserByEmail(email);
    if (!user) throw new BadRequestException('IS_NOT_EXISTS');
    const token = this.generateResetPasswordToken(email);
    user.resetPasswordToken = token;
    await this.nestAuthRepository.save(user);
    await this.nestAuthMailerService.sendResetPassword({
      to: user.email,
      context: {
        user,
      },
    });
  }

  async passwordNew(
    { resetPasswordToken, password }: PasswordNewDto,
    ...[]: any[]
  ): Promise<void> {
    const user = await this.nestAuthRepository.findOne({
      where: { resetPasswordToken },
    });
    if (!user) throw new BadRequestException('IS_NOT_EXISTS');
    const isValid = await this.verifyResetPasswordToken(
      user.email,
      resetPasswordToken,
    );
    if (!isValid) throw new BadRequestException('TOKEN_INVALID');

    user.password = await NestAuthTypeOrmService.encryptPassword(password);
    user.resetPasswordToken = null;
    await this.nestAuthRepository.manager.save(user);
  }

  async strategyCallback(strategy: string, profile: any, ...[]: any[]) {
    const signUpDto = await this.cleanProfilePayload(strategy, profile);

    let user = await this.findUserByEmail(signUpDto.email);
    if (!user) {
      const entity = this.nestAuthRepository.create(signUpDto);
      user = await this.nestAuthRepository.manager.save(entity);
    }

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
      select: ['password', 'email', 'id'],
    });
  }
}

export type GetUserWithTokenType = ReturnType<
  NestAuthTypeOrmService['getUserWithTokens']
>;
