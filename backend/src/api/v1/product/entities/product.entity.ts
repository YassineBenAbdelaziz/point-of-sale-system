import { BaseEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { PurchaseItem } from '../../purchase-items/entities/purchase-item.entity';
import { PriceListProduct } from '../../price-list/entities/price-list-product.entity';
import { BuyX_GetY } from '../../loyalty-programs/entities/buy-x-get-y.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  designation: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  price: number;

  @Column({ type: 'integer', nullable: false })
  stock: number;

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

  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.productId)
  purchases: PurchaseItem[];

  @OneToMany(
    () => PriceListProduct,
    (priceListProduct) => priceListProduct.product,
  )
  priceListProducts: PriceListProduct[];

  @OneToMany(() => BuyX_GetY, (buyXGetY) => buyXGetY.xProduct)
  buyThisGetY: BuyX_GetY[];

  @OneToMany(() => BuyX_GetY, (buyXGetY) => buyXGetY.yProduct)
  buyXGetThis: BuyX_GetY[];
}
