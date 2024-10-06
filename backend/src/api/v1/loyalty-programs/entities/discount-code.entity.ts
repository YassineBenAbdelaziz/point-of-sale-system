import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { LoyaltyProgram } from './loyalty-program.entity';

@Entity('discount_codes')
export class DiscountCode {
  @PrimaryColumn({ type: 'varchar', length: 15, nullable: false })
  code: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(
    () => LoyaltyProgram,
    (loyaltyProgram) => loyaltyProgram.discountCodes,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'loyalty_program_id' })
  loyaltyProgram: LoyaltyProgram;
}
