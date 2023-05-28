import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
@Entity({ name: 'roles' })
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'rol_name', type: 'varchar', length: 24, unique: true })
  rolName: string;

  @OneToMany(() => User, (user) => user.rol)
  users: User[];

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
