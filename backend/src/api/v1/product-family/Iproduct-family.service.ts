import { CreateProductFamilyDto } from './dto/create-product-family.dto';
import { ProductFamily } from './entities/product-family.entity';

export interface IProductFamilyService {
  create(
    createProductFamilyDto: CreateProductFamilyDto,
  ): Promise<ProductFamily>;
  findAll(): Promise<ProductFamily[]>;
  findOne(id: number): Promise<ProductFamily>;
  update(
    id: number,
    updateProductFamilyDto: CreateProductFamilyDto,
  ): Promise<ProductFamily>;
  remove(id: number): Promise<void>;
}
