"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategyProvider = void 0;
const jwt_stategy_1 = require("./jwt.stategy");
class JwtStrategyProvider {
    static provide(options) {
        return {
            provide: jwt_stategy_1.JwtStrategy,
            useFactory: () => new jwt_stategy_1.JwtStrategy(options),
        };
    }
}
exports.JwtStrategyProvider = JwtStrategyProvider;
//# sourceMappingURL=jwt.provider.js.map