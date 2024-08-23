import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('invoice_products')
export class InvoiceProduct {
  @PrimaryColumn({ type: 'integer' })
  invoiceId: number;

  @PrimaryColumn({ type: 'integer' })
  productId: number;

  @Column({ type: 'integer', nullable: false })
  quantity: number;
}
