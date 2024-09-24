import { BaseEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PriceListProduct } from './price-list-product.entity';

@Entity('price-lists')
export class PriceList extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'date', nullable: true })
  expriresAt: Date | null;

  @OneToMany(
    () => PriceListProduct,
    (priceListProduct) => priceListProduct.priceList,
    {
      cascade: ['insert', 'update'],
    },
  )
  products: PriceListProduct[];
}
