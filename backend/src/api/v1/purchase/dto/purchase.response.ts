import { Expose, Type } from 'class-transformer';
import { PurchaseItemResponse } from '../../purchase-items/dto/purchase-item.response';

export class PurchaseResponse {
  @Expose()
  id: number;

  @Expose()
  customerId: number;

  @Expose()
  @Type(() => PurchaseItemResponse)
  items: PurchaseItemResponse[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
