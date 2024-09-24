import { BaseEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Coupon } from './coupon.entity';
import { BuyX_GetY } from './buy-x-get-y.entity';
import { DiscountCode } from './discount-code.entity';

@Entity('loyalty_programs')
export class LoyaltyProgram extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'timestamp', nullable: false })
  expiresAt: Date;

  @Column({ type: 'enum', enum: ['COUPON', 'BUY_X_GET_Y'], nullable: false })
  type: 'COUPON' | 'BUY_X_GET_Y';

  @OneToOne(() => Coupon, (coupon) => coupon.loyaltyProgram, {
    nullable: true,
    cascade: ['insert'],
  })
  coupon: Coupon | null;

  @OneToOne(() => BuyX_GetY, (buy_x_get_y) => buy_x_get_y.loyaltyProgram, {
    nullable: true,
    cascade: ['insert'],
  })
  buyXGetY: BuyX_GetY | null;

  @OneToMany(
    () => DiscountCode,
    (discountCode) => discountCode.loyaltyProgram,
    {
      cascade: ['insert'],
    },
  )
  discountCodes: DiscountCode[];
}
