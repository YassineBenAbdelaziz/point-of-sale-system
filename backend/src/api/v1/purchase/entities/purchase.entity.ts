import { BaseEntity } from 'src/shared/entities/base-entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { CustomerInvoice } from '../../customer-invoice/entities/customer-invoice.entity';
import { PurchaseItem } from '../../purchase-items/entities/purchase-item.entity';

@Entity()
export class Purchase extends BaseEntity {
  @ManyToOne(() => Customer, (customer) => customer.purchases, {
    nullable: true,
  })
  @JoinColumn({
    name: 'customer_id',
    foreignKeyConstraintName: 'FK_purchase_customer',
  })
  customer: Customer | null;

  @OneToOne(
    () => CustomerInvoice,
    (customerInvoice) => customerInvoice.purchase,
    {
      nullable: true,
    },
  )
  @JoinColumn({
    name: 'invoice_id',
    foreignKeyConstraintName: 'FK_purchase_invoice',
  })
  invoice: CustomerInvoice | null;

  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.purchase, {
    cascade: ['insert'],
  })
  items: PurchaseItem[];
}
