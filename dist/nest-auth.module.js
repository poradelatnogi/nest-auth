"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestAuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestAuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_stategy_1 = require("./jwt/jwt.stategy");
const google_strategy_1 = require("./google/google.strategy");
const microsoft_strategy_1 = require("./microsoft/microsoft.strategy");
const nest_auth_service_1 = require("./nest-auth.service");
let NestAuthModule = NestAuthModule_1 = class NestAuthModule {
    static register(options) {
        const { jwtModuleOptions, microsoftStrategyOptions, googleStrategyOptions, } = options;
        const strategies = [];
        if (!googleStrategyOptions)
            strategies.push(google_strategy_1.GoogleStrategy);
        if (!microsoftStrategyOptions)
            strategies.push(microsoft_strategy_1.MicrosoftStrategy);
        return {
            module: NestAuthModule_1,
            imports: [jwt_1.JwtModule.register(jwtModuleOptions)],
            providers: [
                {
                    provide: 'NEST_AUTH_OPTIONS',
                    useValue: options,
                },
                nest_auth_service_1.NestAuthService,
                jwt_stategy_1.JwtStrategy,
                ...strategies,
            ],
            exports: [nest_auth_service_1.NestAuthService],
        };
    }
};
NestAuthModule = NestAuthModule_1 = __decorate([
    (0, common_1.Module)({})
], NestAuthModule);
exports.NestAuthModule = NestAuthModule;
//# sourceMappingURL=nest-auth.module.js.map