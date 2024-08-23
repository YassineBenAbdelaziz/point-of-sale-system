import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { CustomerInvoice } from '../../customer-invoice/entities/customer-invoice.entity';

@Entity('invoice_products')
export class InvoiceProduct {
  @PrimaryColumn({ type: 'integer' })
  invoiceId: number;

  @PrimaryColumn({ type: 'integer' })
  productId: number;

  @ManyToOne(
    () => CustomerInvoice,
    (customerInvoice) => customerInvoice.products,
  )
  @JoinColumn({ name: 'invoiceId' })
  invoice: CustomerInvoice;

  @ManyToOne(() => Product, (product) => product.invoices)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'integer', nullable: false, default: 1 })
  quantity: number;
}
