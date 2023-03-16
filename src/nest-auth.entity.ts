import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from './enums/user-role.enum';

@Entity({ name: 'user' })
export class NestAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  firstName: string;

  @Column('text', { nullable: true })
  lastName: string | null;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: true, select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRoles, nullable: true })
  roles: UserRoles;

  @Column({ type: 'text', nullable: true })
  resetPasswordToken?: string | null;
}
