import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rol } from './rol.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 24 })
  name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 24 })
  lastName: string;

  @Column({ name: 'e_mail', type: 'varchar', length: 64 })
  eMail: string;

  @Column({ type: 'varchar', unique: true })
  password: string;

  @Column({ name: 'account_validation', type: 'boolean' })
  accountValidation: boolean;

  @ManyToOne(() => Rol, (rol) => rol.users)
  rol: Rol;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
