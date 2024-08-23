import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_types')
export class PaymentType {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  designation: string;
}
