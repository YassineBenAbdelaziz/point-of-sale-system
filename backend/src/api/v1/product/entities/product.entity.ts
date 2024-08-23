import { BaseEntity } from 'src/shared/entities/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { InvoiceProduct } from '../../invoice-products/entities/invoice-product.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  designation: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image: string;

  @ManyToOne(() => Category, (category) => category.mainProducts, {
    nullable: false,
  })
  @JoinColumn({ name: 'main_category_id' })
  mainCategory: Category;

  @ManyToMany(() => Category, (category) => category.subProducts)
  subCategories: Category[];

  @OneToMany(() => InvoiceProduct, (invoiceProduct) => invoiceProduct.productId)
  invoices: InvoiceProduct[];
}
