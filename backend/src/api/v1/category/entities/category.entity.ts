import { BaseEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  designation: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @OneToMany(() => Product, (product) => product.mainCategory, { lazy: true })
  mainProducts: Product[];

  @ManyToMany(() => Product, (product) => product.subCategories, { lazy: true })
  subProducts: Product[];
}
