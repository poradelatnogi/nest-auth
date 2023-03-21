import { NestAuth } from './nest-auth.entity';
import { Entity, OneToMany } from 'typeorm';
import { NestPermission } from './nest-permission.entity';

@Entity('user')
export class NestAuthWithPermissions extends NestAuth {
  @OneToMany(() => NestPermission, (permission) => permission.user)
  permissions: NestPermission[];
}
