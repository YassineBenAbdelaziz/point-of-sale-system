import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LoyaltyProgram } from './loyalty-program.entity';

@Entity({ name: 'coupons' })
export class Coupon {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: false })
  percentage: number;

  @OneToOne(() => LoyaltyProgram, (loyaltyProgram) => loyaltyProgram.buyXGetY, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'loyalty_program_id',
    foreignKeyConstraintName: 'FK_loyalty_program_coupon',
  })
  loyaltyProgram: LoyaltyProgram;
}
