import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { LoyaltyProgram } from './loyalty-program.entity';

@Entity({ name: 'buy_x_get_y' })
export class BuyX_GetY {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  id: number;

  @Column({ type: 'integer', nullable: false })
  xProductId: number;

  @Column({ type: 'integer', nullable: false })
  yProductId: number;

  @ManyToOne(() => Product, (product) => product.buyThisGetY, {
    nullable: false,
  })
  @JoinColumn({ name: 'xProductId' })
  xProduct: Product;

  @Column({ type: 'integer', nullable: false })
  xQuantity: number;

  @ManyToOne(() => Product, (product) => product.buyXGetThis, {
    nullable: false,
  })
  @JoinColumn({ name: 'yProductId' })
  yProduct: Product;

  @OneToOne(() => LoyaltyProgram, (loyaltyProgram) => loyaltyProgram.buyXGetY, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'loyalty_program_id',
    foreignKeyConstraintName: 'FK_loyalty_program_buy_x_get_y',
  })
  loyaltyProgram: LoyaltyProgram;
}
