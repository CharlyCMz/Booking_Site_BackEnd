import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';

import { Category } from './category.entity';
import { Image } from './image.entity';
import { City } from './city.entity';
import { Policy } from './policy.entity';
import { Feature } from './feature.entity';
@Entity({ name: 'products' })
@Unique(['name'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  score: number;

  @Column({ type: 'boolean' })
  availability: boolean;

  @ManyToMany(() => Feature, (feature) => feature.products)
  @JoinTable()
  features: Feature[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => City, (city) => city.products)
  city: City;

  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @ManyToMany(() => Policy, (policy) => policy.products)
  @JoinTable()
  policies: Policy[];

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
