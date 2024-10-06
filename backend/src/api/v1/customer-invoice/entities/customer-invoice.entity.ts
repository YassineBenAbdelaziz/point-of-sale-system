import { BaseEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';
import { Overpay } from '../../overpay/entities/overpay.entity';
import { Purchase } from '../../purchase/entities/purchase.entity';

@Entity('customers_invoices')
export class CustomerInvoice extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  discount: number;

  @OneToOne(() => Overpay, (overpay) => overpay.invoice, { nullable: true })
  @JoinColumn({ name: 'overpay_id' })
  overpay: Overpay;

  @OneToMany(() => Payment, (payment) => payment.invoice)
  payments: Payment[];

  @OneToOne(() => Purchase, (purchase) => purchase.invoice, {
    nullable: false,
  })
  purchase: Purchase;
}
