import { Expose } from 'class-transformer';

export class PurchaseItemResponse {
  @Expose()
  id: number;

  @Expose()
  productId: number;

  @Expose()
  priceListId: number;

  @Expose()
  quantity: number;

  @Expose()
  adjustedPrice: number;
}
