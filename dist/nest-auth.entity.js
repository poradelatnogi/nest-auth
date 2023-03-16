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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestAuth = void 0;
const typeorm_1 = require("typeorm");
const user_role_enum_1 = require("./enums/user-role.enum");
let NestAuth = class NestAuth {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NestAuth.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], NestAuth.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], NestAuth.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: false }),
    __metadata("design:type", String)
], NestAuth.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true, select: false }),
    __metadata("design:type", String)
], NestAuth.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: user_role_enum_1.UserRoles, nullable: true }),
    __metadata("design:type", String)
], NestAuth.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], NestAuth.prototype, "resetPasswordToken", void 0);
NestAuth = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' })
], NestAuth);
exports.NestAuth = NestAuth;
//# sourceMappingURL=nest-auth.entity.js.map