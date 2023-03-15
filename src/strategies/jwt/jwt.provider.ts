import { JwtStrategyOptions } from './jwt.options';
import { Provider } from '@nestjs/common';
import { JwtStrategy } from './jwt.stategy';

export class JwtStrategyProvider {
  static provide(options: JwtStrategyOptions): Provider {
    return {
      provide: JwtStrategy,
      useFactory: () => new JwtStrategy(options),
    };
  }
}
