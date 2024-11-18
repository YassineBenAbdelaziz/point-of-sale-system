import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('categories')
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  designation: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @TreeParent({
    onDelete: 'CASCADE',
  })
  parent: Category | null;

  @TreeChildren()
  subCategories: Category[];

  @OneToMany(() => Product, (product) => product.category, {
    onDelete: 'SET NULL',
    lazy: true,
  })
  products: Product[];
}
