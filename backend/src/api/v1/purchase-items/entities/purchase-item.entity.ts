import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Purchase } from '../../purchase/entities/purchase.entity';

@Entity('purchase_items')
export class PurchaseItem {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id: number;

  @Column({ type: 'integer', nullable: false })
  purchaseId: number;

  @Column({ type: 'integer', nullable: false })
  productId: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'purchaseId' })
  purchase: Purchase;

  @ManyToOne(() => Product, (product) => product.purchases)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'integer', nullable: false, default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  adjustedPrice: number;
}
