import { JwtModuleOptions } from '@nestjs/jwt';
import { GoogleStrategyOptionsDto } from '../google/dto/google-strategy-options.dto';
import { MicrosoftStrategyOptionsDto } from '../microsoft/dto/microsoft-strategy-options.dto';
import {JwtStrategyOptionsDto} from "../jwt/dto/jwt-strategy-options.dto";

export class NestAuthOptionsDto {
  jwtModuleOptions: JwtModuleOptions;
  jwtStrategyOptions: JwtStrategyOptionsDto;

  googleStrategyOptions?: GoogleStrategyOptionsDto;
  microsoftStrategyOptions?: MicrosoftStrategyOptionsDto;
}
