import { StrongPasswordDto } from './strong-password.dto';
import { IsString } from 'class-validator';

export class PasswordNewDto extends StrongPasswordDto {
  @IsString()
  resetPasswordToken: string;
}
