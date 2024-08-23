import { BaseEntity } from 'src/shared/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class CustomerInvoice extends BaseEntity {
  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  overpay: number;
}
