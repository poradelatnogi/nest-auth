import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StrongPasswordDto } from './strong-password.dto';

export class SignUpDto extends StrongPasswordDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Matches(/^[a-zA-Z\s]+$/, { message: 'firstName contains forbidden symbols' })
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Matches(/^[a-zA-Z\s]+$/, { message: 'lastName contains forbidden symbols' })
  @IsOptional()
  lastName: string;

  @IsEmail()
  email: string;
}
