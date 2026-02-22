import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { PaginationResponse } from 'src/shared/interfaces/paginationResponse';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-all-products.dto';

export interface IProductService {
  create(createProductDto: CreateProductDto): Promise<Product>;

  findAll(
    findProductsDto: FindProductsDto,
  ): Promise<PaginationResponse<Product>>;

  findOne(id: number): Promise<Product>;

  findByIds(ids: number[]): Promise<Product[]>;

  update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;

  remove(id: number): Promise<void>;
}
