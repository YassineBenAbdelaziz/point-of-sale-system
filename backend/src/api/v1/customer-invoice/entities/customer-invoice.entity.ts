import { BaseEntity } from 'src/shared/entities/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { InvoiceProduct } from '../../invoice-products/entities/invoice-product.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Overpay } from '../../overpay/entities/overpay.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity('customers_invoices')
export class CustomerInvoice extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  discount: number;

  @OneToOne(() => Overpay, (overpay) => overpay.invoice, { nullable: true })
  @JoinColumn({ name: 'overpay_id' })
  overpay: Overpay;

  @OneToMany(() => InvoiceProduct, (invoiceProduct) => invoiceProduct.invoiceId)
  products: InvoiceProduct[];

  @OneToMany(() => Payment, (payment) => payment.invoice)
  payments: Payment[];

  @ManyToOne(() => Customer, (customer) => customer.invoices, {
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
