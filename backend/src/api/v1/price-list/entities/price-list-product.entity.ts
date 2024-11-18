import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PriceList } from './price-list.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('price_list_products')
export class PriceListProduct {
  @PrimaryColumn({ type: 'integer' })
  priceListId: number;

  @PrimaryColumn({ type: 'integer' })
  productId: number;

  @Column({ type: 'integer', nullable: false, default: 1 })
  minQuantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  newPrice: number;

  @ManyToOne(() => PriceList, (priceList) => priceList.products, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'priceListId' })
  priceList: PriceList;

  @ManyToOne(() => Product, (product) => product.priceListProducts)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
