import { BaseEntity } from 'src/shared/entities/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { InvoiceProduct } from '../../invoice-products/entities/invoice-product.entity';
import { ProductFamily } from '../../product-family/entities/product-family.entity';

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

  @ManyToOne(() => ProductFamily, (family) => family.products, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'family_id', foreignKeyConstraintName: 'FK_FAMILY_ID' })
  family: ProductFamily | null;

  @ManyToMany(() => Category, (category) => category.products, {
    eager: true,
  })
  @JoinTable({ name: 'products_categories' })
  categories: Category[];

  @OneToMany(() => InvoiceProduct, (invoiceProduct) => invoiceProduct.productId)
  invoices: InvoiceProduct[];
}
