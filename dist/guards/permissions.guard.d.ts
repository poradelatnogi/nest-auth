import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NestPermission } from '../entities';
import { Repository } from 'typeorm';
import { Request } from 'express';
export declare class PermissionsGuard implements CanActivate {
    private readonly reflector;
    private readonly nestPermissionRepository;
    constructor(reflector: Reflector, nestPermissionRepository: Repository<NestPermission>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    hasRoles(request: Request & {
        user?: any;
    }, verifiableRoles: string[]): Promise<boolean>;
}
//# sourceMappingURL=permissions.guard.d.ts.map