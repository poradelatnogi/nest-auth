import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { NestPermission } from '../entities';
import { In, Repository } from 'typeorm';
import { Request } from 'express';

export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(NestPermission)
    private readonly nestPermissionRepository: Repository<NestPermission>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const verifiableRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const noVerifiableRoles = !verifiableRoles || !verifiableRoles.length;
    if (noVerifiableRoles) return true;
    return await this.hasRoles(request, verifiableRoles);
  }

  async hasRoles(
    request: Request & { user?: any },
    verifiableRoles: string[],
  ): Promise<boolean> {
    const user = request.user;
    if (!user) throw new UnauthorizedException('USER_IS_NOT_AUTHORIZED');

    const count = await this.nestPermissionRepository.count({
      where: {
        user: {
          id: user?.id,
        },
        role: In(verifiableRoles),
      },
    });

    return count > 0;
  }
}
