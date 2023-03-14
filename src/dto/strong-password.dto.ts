import { IsStrongPassword } from 'class-validator';

export class StrongPasswordDto {
  @IsStrongPassword(
    {
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'password must be a strong' },
  )
  password: string;
}
