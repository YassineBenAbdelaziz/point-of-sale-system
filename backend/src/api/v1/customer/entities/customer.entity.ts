import { Column, Entity, OneToMany } from 'typeorm';
import { CustomerInvoice } from '../../customer-invoice/entities/customer-invoice.entity';
import { BaseEntity } from 'src/shared/entities/base-entity';

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

  @OneToMany(
    () => CustomerInvoice,
    (customerInvoice) => customerInvoice.customer,
  )
  invoices: CustomerInvoice[];
}
