import { PaginationParams } from 'src/shared/classes/paginationParams';
import { CreatePriceListDto } from './dto/create-price-list.dto';
import { UpdatePriceListDto } from './dto/update-price-list.dto';
import { PriceList } from './entities/price-list.entity';
import { PaginationResponse } from 'src/shared/interfaces/paginationResponse';

export interface IPriceListService {
  create(createPriceListDto: CreatePriceListDto): Promise<PriceList>;

  findAll(
    paginationParams: PaginationParams,
  ): Promise<PaginationResponse<PriceList>>;

  findOne(id: number): Promise<PriceList>;

  update(
    id: number,
    updatePriceListDto: UpdatePriceListDto,
  ): Promise<PriceList>;

  remove(id: number): Promise<void>;
}
