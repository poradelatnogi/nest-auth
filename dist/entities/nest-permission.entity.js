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
exports.NestPermission = void 0;
const typeorm_1 = require("typeorm");
const nest_auth_with_permissions_entity_1 = require("./nest-auth-with-permissions.entity");
const enums_1 = require("../enums");
let NestPermission = class NestPermission {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NestPermission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nest_auth_with_permissions_entity_1.NestAuthWithPermissions, (user) => user.permissions),
    __metadata("design:type", nest_auth_with_permissions_entity_1.NestAuthWithPermissions)
], NestPermission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.NestRolesEnums }),
    __metadata("design:type", String)
], NestPermission.prototype, "role", void 0);
NestPermission = __decorate([
    (0, typeorm_1.Entity)('permission')
], NestPermission);
exports.NestPermission = NestPermission;
//# sourceMappingURL=nest-permission.entity.js.map