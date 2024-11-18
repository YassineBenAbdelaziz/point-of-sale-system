import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CustomerInvoice } from '../../customer-invoice/entities/customer-invoice.entity';
import { PaymentType } from '../../payment-type/entities/payment-type.entity';
import { BaseEntity } from 'src/shared/entities/base-entity';

@Entity('payments')
export class Payment extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  price: number;

  @ManyToOne(
    () => CustomerInvoice,
    (customerInvoice) => customerInvoice.payments,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'invoice_id' })
  invoice: CustomerInvoice;

  @ManyToOne(() => PaymentType, (paymentType) => paymentType.payments, {
    nullable: false,
  })
  @JoinColumn({ name: 'payment_type_id' })
  paymentType: PaymentType;
}
