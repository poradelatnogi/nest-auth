import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NestAuthService } from './services/nest-auth.service';
import { PasswordNewDto, PasswordResetDto, SignInDto, SignUpDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class NestAuthController {
  constructor(protected readonly nestAuthService: NestAuthService) {}
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto, ...[]: any[]): Promise<any> {
    return this.nestAuthService.signIn(signInDto);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: SignUpDto, ...[]: any[]): Promise<any> {
    return this.nestAuthService.signUp(signUpDto);
  }

  @Post('password/reset')
  @HttpCode(HttpStatus.ACCEPTED)
  async passwordReset(
    @Body() passwordResetDto: PasswordResetDto,
  ): Promise<any> {
    return this.nestAuthService.passwordReset(passwordResetDto);
  }

  @Post('password/new')
  @HttpCode(HttpStatus.ACCEPTED)
  async passwordNew(@Body() passwordNewDto: PasswordNewDto): Promise<any> {
    return this.nestAuthService.passwordNew(passwordNewDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.ACCEPTED)
  async google(): Promise<void> {
    // Do nothing
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  async googleCallback(@Req() req: Request & { user?: any }) {
    return this.nestAuthService.strategyCallback('google', req.user);
  }

  @Get('microsoft')
  @UseGuards(AuthGuard('microsoft'))
  @HttpCode(HttpStatus.ACCEPTED)
  async microsoft(): Promise<void> {
    // Do nothing
  }

  @Get('microsoft/callback')
  @UseGuards(AuthGuard('microsoft'))
  @HttpCode(HttpStatus.OK)
  async microsoftCallback(@Req() req: Request & { user?: any }) {
    return this.nestAuthService.strategyCallback('microsoft', req.user);
  }
}
