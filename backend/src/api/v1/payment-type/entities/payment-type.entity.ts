import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('payment_types')
export class PaymentType {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  designation: string;

  @OneToMany(() => Payment, (payment) => payment.paymentType)
  payments: Payment[];
}
