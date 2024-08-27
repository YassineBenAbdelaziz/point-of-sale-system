import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  designation: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @ManyToMany(() => Product, (product) => product.categories, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  products: Product[];
}
