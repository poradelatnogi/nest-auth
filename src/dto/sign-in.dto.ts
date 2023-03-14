import { IsEmail } from 'class-validator';
import { StrongPasswordDto } from './strong-password.dto';

export class SignInDto extends StrongPasswordDto {
  @IsEmail()
  email: string;
}
