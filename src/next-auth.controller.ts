import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import {PasswordResetDto} from "./dto/password-reset.dto";
import {PasswordNewDto} from "./dto/password-new.dto";

@Controller('auth')
export class NextAuthController {
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    // check if user authenticated
    // return payload
    return signInDto;
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    // check if user is not exists
    // create user
    // return payload
    return signUpDto;
  }

  @Post('password/reset')
  async passwordReset(@Body() passwordResetDto: PasswordResetDto) {
    // pass user email to send a reset link message by email
  }

  @Post('password/new')
  async passwordNew(@Body() passwordNewDto: PasswordNewDto) {
    // password new handler
  }

  @Get(':service')
  async service(@Param('service') service: string) {
    // login or register user via service. Example: Google, Twitter, Facebook etc.
  }

  @Get(':service/callback')
  async serviceCallback(@Param('service') service: string) {
    // get user data via auth service. Example: Google, Twitter, Facebook etc.
  }
}
