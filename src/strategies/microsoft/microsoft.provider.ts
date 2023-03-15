import { MicrosoftStrategyOptions } from './microsoft.options';
import { Provider } from '@nestjs/common';
import { MicrosoftStrategy } from './microsoft.strategy';

export class MicrosoftStrategyProvider {
  static provide(options: MicrosoftStrategyOptions): Provider {
    return {
      provide: MicrosoftStrategy,
      useFactory: () => new MicrosoftStrategy(options),
    };
  }
}
