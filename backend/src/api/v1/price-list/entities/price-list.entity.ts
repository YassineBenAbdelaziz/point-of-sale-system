import { BaseEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { PriceListProduct } from './price-list-product.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity('price-lists')
export class PriceList extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'date', nullable: true })
  expiresAt: Date | null;

  @OneToMany(
    () => PriceListProduct,
    (priceListProduct) => priceListProduct.priceList,
    {
      cascade: ['insert', 'update'],
    },
  )
  products: PriceListProduct[];

  @ManyToMany(() => Customer, (customer) => customer.priceLists)
  customers: Customer[];
}
