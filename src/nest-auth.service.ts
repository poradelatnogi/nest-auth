import { Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto, PasswordResetDto, PasswordNewDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class NestAuthService {
  async signIn(signInDto: SignInDto, ...[]: any[]): Promise<any> {
    // check if user authenticated, return jwt payload
  }

  async signUp(signUpDto: SignUpDto, ...[]: any[]) {
    // check if user is not exists, create user, return jwt payload
  }

  async passwordReset(passwordResetDto: PasswordResetDto, ...[]: any[]) {
    // check if user exists by email, generate resetToken, send reset password email to user
  }

  async passwordNew(passwordNewDto: PasswordNewDto, ...[]: any[]) {
    // check if resetToken valid, find user, set new password
  }

  async strategyCallback(strategy: string, profile: any, ...[]: any[]) {
    // get user data via auth service. Example: Google, Twitter, Facebook etc.
  }

  static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(hashToCompare: string, expectedHash: string) {
    return await bcrypt.compare(hashToCompare, expectedHash);
  }
}
