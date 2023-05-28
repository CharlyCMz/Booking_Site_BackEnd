import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { PolicyType } from './policyType.entity';

@Entity({ name: 'policies' })
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @ManyToOne(() => Product, (product) => product.policies)
  product: Product;

  @ManyToOne(() => PolicyType, (policyType) => policyType.policies)
  policyType: PolicyType;

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
