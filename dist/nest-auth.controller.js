"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestAuthController = void 0;
const common_1 = require("@nestjs/common");
const nest_auth_service_1 = require("./nest-auth.service");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const password_reset_dto_1 = require("./dto/password-reset.dto");
const password_new_dto_1 = require("./dto/password-new.dto");
const passport_1 = require("@nestjs/passport");
let NestAuthController = class NestAuthController {
    constructor(nestAuthService) {
        this.nestAuthService = nestAuthService;
    }
    async signIn(signInDto, ...[]) {
        return this.nestAuthService.signIn(signInDto);
    }
    async signUp(signUpDto, ...[]) {
        return this.nestAuthService.signUp(signUpDto);
    }
    async passwordReset(passwordResetDto) {
        return this.nestAuthService.passwordReset(passwordResetDto);
    }
    async passwordNew(passwordNewDto) {
        return this.nestAuthService.passwordNew(passwordNewDto);
    }
    async google() {
        // Do nothing
    }
    async googleCallback(req) {
        return this.nestAuthService.strategyCallback('google', req);
    }
    async microsoft() {
        // Do nothing
    }
    async microsoftCallback(req) {
        return this.nestAuthService.strategyCallback('microsoft', req);
    }
};
__decorate([
    (0, common_1.Post)('sign-in'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], NestAuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.SignUpDto, Object]),
    __metadata("design:returntype", Promise)
], NestAuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('password/reset'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_reset_dto_1.PasswordResetDto]),
    __metadata("design:returntype", Promise)
], NestAuthController.prototype, "passwordReset", null);
__decorate([
    (0, common_1.Post)('password/new'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_new_dto_1.PasswordNewDto]),
    __metadata("design:returntype", Promise)
], NestAuthController.prototype, "passwordNew", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NestAuthController.prototype, "google", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NestAuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Get)('microsoft'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('microsoft')),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NestAuthController.prototype, "microsoft", null);
__decorate([
    (0, common_1.Get)('microsoft/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('microsoft')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NestAuthController.prototype, "microsoftCallback", null);
NestAuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)(nest_auth_service_1.NestAuthService)),
    __metadata("design:paramtypes", [nest_auth_service_1.NestAuthService])
], NestAuthController);
exports.NestAuthController = NestAuthController;
//# sourceMappingURL=nest-auth.controller.js.map