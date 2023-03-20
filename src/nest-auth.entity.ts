import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class NestAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  firstName: string;

  @Column('text', { nullable: true })
  lastName?: string | null;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: true, select: false })
  password: string;

  @Column({ type: 'text', nullable: true })
  resetPasswordToken?: string | null;
}
