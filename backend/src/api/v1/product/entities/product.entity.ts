import { BaseEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
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

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'category_id',
    foreignKeyConstraintName: 'FK_CATEGORY_ID',
  })
  category: Category | null;

  @OneToMany(() => InvoiceProduct, (invoiceProduct) => invoiceProduct.productId)
  invoices: InvoiceProduct[];
}
