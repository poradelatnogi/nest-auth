import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NestAuthWithPermissions } from './nest-auth-with-permissions.entity';
import { NestRolesEnums } from '../enums';

@Entity('permission')
export class NestPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NestAuthWithPermissions, (user) => user.permissions)
  user: NestAuthWithPermissions;

  @Column({ type: 'enum', enum: NestRolesEnums })
  role: NestRolesEnums;
}
