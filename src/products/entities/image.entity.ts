import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Product } from './product.entity';
@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  url: string;

  @ManyToOne(() => Product, (product) => product.images, { nullable: true })
  product: Product;

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
