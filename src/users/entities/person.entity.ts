import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { IdType } from './id-type.entity';

@Entity({ name: 'persons' })
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10 })
  type: string;

  @Column({ name: 'person_type', type: 'varchar', length: 3 })
  personType: string;

  @ManyToOne(() => IdType, (idType) => idType.persons)
  idType: IdType;

  @Column({ type: 'varchar', length: 10 })
  document: string;

  @Column({ name: 'first_name', type: 'varchar', length: 24 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 24 })
  lastName: string;

  @Column({ name: 'comercial_name', type: 'varchar', length: 24 })
  comercialName: string;

  @Column({ name: 'mail', type: 'varchar', length: 64 })
  mail: string;

  @OneToOne(() => Address, { nullable: false })
  @JoinColumn()
  address: Address;

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

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
  })
  deletedAt: Date;
}
