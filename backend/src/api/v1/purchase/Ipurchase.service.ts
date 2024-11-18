import { PaginationParams } from 'src/shared/classes/paginationParams';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { PaginationResponse } from 'src/shared/interfaces/paginationResponse';
import { PurchaseResponse } from './dto/purchase.response';

export interface IPurchaseService {
  create(createPurchaseDto: CreatePurchaseDto): Promise<PurchaseResponse>;
  findAll(
    paginationParams: PaginationParams,
  ): Promise<PaginationResponse<Purchase>>;
  findOne(id: number): Promise<Purchase>;
  remove(id: number): Promise<void>;
}
