"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategyProvider = void 0;
const google_strategy_1 = require("./google.strategy");
class GoogleStrategyProvider {
    static provide(options) {
        return {
            provide: google_strategy_1.GoogleStrategy,
            useFactory: () => new google_strategy_1.GoogleStrategy(options),
        };
    }
}
exports.GoogleStrategyProvider = GoogleStrategyProvider;
//# sourceMappingURL=google.provider.js.map