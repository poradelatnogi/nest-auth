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
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const typeorm_2 = require("typeorm");
let PermissionsGuard = class PermissionsGuard {
    constructor(reflector, nestPermissionRepository) {
        this.reflector = reflector;
        this.nestPermissionRepository = nestPermissionRepository;
    }
    async canActivate(context) {
        const verifiableRoles = this.reflector.get('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const noVerifiableRoles = !verifiableRoles || !verifiableRoles.length;
        if (noVerifiableRoles)
            return true;
        return await this.hasRoles(request, verifiableRoles);
    }
    async hasRoles(request, verifiableRoles) {
        const user = request.user;
        if (!user)
            throw new common_1.UnauthorizedException('USER_IS_NOT_AUTHORIZED');
        const count = await this.nestPermissionRepository.count({
            where: {
                user: {
                    id: user === null || user === void 0 ? void 0 : user.id,
                },
                role: (0, typeorm_2.In)(verifiableRoles),
            },
        });
        return count > 0;
    }
};
PermissionsGuard = __decorate([
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.NestPermission)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository])
], PermissionsGuard);
exports.PermissionsGuard = PermissionsGuard;
//# sourceMappingURL=permissions.guard.js.map