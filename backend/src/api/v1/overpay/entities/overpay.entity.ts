import { BaseEntity, Column } from 'typeorm';

export class Overpay extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  code: string;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: false })
  amount: number;

  @Column({ type: 'date', nullable: false })
  dueDate: Date;

  @Column({ type: 'boolean', nullable: false })
  used: boolean;
}
