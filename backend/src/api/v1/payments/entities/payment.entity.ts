import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('payments')
export class Payment extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  price: number;
}
