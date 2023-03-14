import { Module, DynamicModule } from '@nestjs/common';
import { NextAuthOptionsDto } from './dto/next-auth-options.dto';
import {NextAuthController} from "./next-auth.controller";

@Module({})
export class NextAuthModule {
  static register(options: NextAuthOptionsDto): DynamicModule {
    return {
      module: NextAuthModule,
      providers: [
        {
          provide: 'NEXT_AUTH_OPTIONS',
          useValue: options,
        },
      ],
      controllers: [NextAuthController]
    };
  }
}
