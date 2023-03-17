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
const nest_auth_service_1 = require("./services/nest-auth.service");
const jwt_1 = require("@nestjs/jwt");
const nest_auth_mail_service_1 = require("./services/nest-auth-mail.service");
const mailer_1 = require("@nestjs-modules/mailer");
let NestAuthModule = NestAuthModule_1 = class NestAuthModule {
    static register(options) {
        return {
            module: NestAuthModule_1,
            imports: [
                jwt_1.JwtModule.register({}),
                mailer_1.MailerModule.forRoot(options.mailerOptions),
            ],
            providers: [nest_auth_service_1.NestAuthService, nest_auth_mail_service_1.NestAuthMailService, jwt_1.JwtService],
            exports: [nest_auth_service_1.NestAuthService, nest_auth_mail_service_1.NestAuthMailService, jwt_1.JwtService],
        };
    }
};
NestAuthModule = NestAuthModule_1 = __decorate([
    (0, common_1.Module)({})
], NestAuthModule);
exports.NestAuthModule = NestAuthModule;
//# sourceMappingURL=nest-auth.module.js.map