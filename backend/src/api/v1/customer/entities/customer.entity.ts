import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base-entity';
import { Purchase } from '../../purchase/entities/purchase.entity';
import { PriceList } from '../../price-list/entities/price-list.entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  cin: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  phone: string;

  @OneToMany(() => Purchase, (purchase) => purchase.customer)
  purchases: Purchase[];

  @ManyToMany(() => PriceList, (priceList) => priceList.customers)
  @JoinTable({ name: 'customers_price_lists' })
  priceLists: PriceList[];
}
