"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrosoftStrategyProvider = void 0;
const microsoft_strategy_1 = require("./microsoft.strategy");
class MicrosoftStrategyProvider {
    static provide(options) {
        return {
            provide: microsoft_strategy_1.MicrosoftStrategy,
            useFactory: () => new microsoft_strategy_1.MicrosoftStrategy(options),
        };
    }
}
exports.MicrosoftStrategyProvider = MicrosoftStrategyProvider;
//# sourceMappingURL=microsoft.provider.js.map