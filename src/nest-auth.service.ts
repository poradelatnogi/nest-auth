import { Inject, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto, PasswordResetDto, PasswordNewDto } from './dto';
import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NestAuthService {
  constructor(
    @Inject(JwtService)
    public readonly jwtService: JwtService,
    ...[]: any[]
  ) {}

  async signIn(signInDto: SignInDto, ...[]: any[]): Promise<any> {
    // check if user authenticated, return jwt payload
  }

  async signUp(signUpDto: SignUpDto, ...[]: any[]): Promise<any> {
    // check if user is not exists, create user, return jwt payload
  }

  async passwordReset(
    passwordResetDto: PasswordResetDto,
    ...[]: any[]
  ): Promise<any> {
    // check if user exists by email, generate and save resetToken, send reset password email to user
  }

  async passwordNew(
    passwordNewDto: PasswordNewDto,
    ...[]: any[]
  ): Promise<any> {
    // find user, check if resetToken valid, set new password
  }

  async strategyCallback(
    strategy: string,
    profile: any,
    ...[]: any[]
  ): Promise<any> {
    // get user data via auth service. Example: Google, Twitter, Facebook etc.
  }

  static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(hashToCompare: string, expectedHash: string) {
    return await bcrypt.compare(hashToCompare, expectedHash);
  }

  generateResetPasswordToken(email: string, expiresIn = '1d') {
    const secret = crypto.randomBytes(20).toString('hex');
    const payload = {
      email: email,
      secret: secret,
    };
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  async verifyResetPasswordToken(email: string, token: string) {
    try {
      const decodedToken: any = this.jwtService.decode(token);

      if (decodedToken.email !== email) return false;
      await this.jwtService.verify(token, decodedToken.secret);

      return true;
    } catch (_) {
      return false;
    }
  }
}
