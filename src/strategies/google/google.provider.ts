import { GoogleStrategyOptions } from './google.options';
import { Provider } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';

export class GoogleStrategyProvider {
  static provide(options: GoogleStrategyOptions): Provider {
    return {
      provide: GoogleStrategy,
      useFactory: () => new GoogleStrategy(options),
    };
  }
}
