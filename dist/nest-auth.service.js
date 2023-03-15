"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestAuthService = void 0;
const common_1 = require("@nestjs/common");
let NestAuthService = class NestAuthService {
    async signIn(signInDto, ...[]) {
        // check if user authenticated, return jwt payload
    }
    async signUp(signUpDto, ...[]) {
        // check if user is not exists, create user, return jwt payload
    }
    async passwordReset(passwordResetDto, ...[]) {
        // check if user exists by email, generate resetToken, send reset password email to user
    }
    async passwordNew(passwordNewDto, ...[]) {
        // check if resetToken valid, find user, set new password
    }
    async strategyCallback(strategy, profile, ...[]) {
        // get user data via auth service. Example: Google, Twitter, Facebook etc.
    }
};
NestAuthService = __decorate([
    (0, common_1.Injectable)()
], NestAuthService);
exports.NestAuthService = NestAuthService;
//# sourceMappingURL=nest-auth.service.js.map