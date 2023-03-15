"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestAuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
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
    static async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    static async comparePassword(hashToCompare, expectedHash) {
        return await bcrypt.compare(hashToCompare, expectedHash);
    }
};
NestAuthService = __decorate([
    (0, common_1.Injectable)()
], NestAuthService);
exports.NestAuthService = NestAuthService;
//# sourceMappingURL=nest-auth.service.js.map