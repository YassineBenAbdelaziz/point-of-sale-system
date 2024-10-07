import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerInvoice } from '../../customer-invoice/entities/customer-invoice.entity';

@Entity('overpays')
export class Overpay {
  @PrimaryGeneratedColumn('uuid')
  code: string;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  amount: number;

  @Column({ type: 'date', nullable: false })
  dueDate: Date;

  @Column({ type: 'boolean', nullable: false })
  used: boolean;

  @OneToOne(
    () => CustomerInvoice,
    (customerInvoice) => customerInvoice.overpay,
    {
      nullable: false,
    },
  )
  invoice: CustomerInvoice;
}
