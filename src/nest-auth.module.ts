import { DynamicModule, Module } from '@nestjs/common';
import { NestAuthService } from './nest-auth.service';
import { NestAuthTypeOrmService } from './nest-auth-type-orm.service';

@Module({})
export class NestAuthModule {
  static register(): DynamicModule {
    return {
      module: NestAuthModule,
      providers: [NestAuthService, NestAuthTypeOrmService],
      exports: [NestAuthService, NestAuthTypeOrmService],
    };
  }
}
