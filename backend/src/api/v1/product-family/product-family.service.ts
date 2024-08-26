import { Injectable } from '@nestjs/common';
import { CreateProductFamilyDto } from './dto/create-product-family.dto';
import { UpdateProductFamilyDto } from './dto/update-product-family.dto';

@Injectable()
export class ProductFamilyService {
  create(createProductFamilyDto: CreateProductFamilyDto) {
    return 'This action adds a new productFamily';
  }

  findAll() {
    return `This action returns all productFamily`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productFamily`;
  }

  update(id: number, updateProductFamilyDto: UpdateProductFamilyDto) {
    return `This action updates a #${id} productFamily`;
  }

  remove(id: number) {
    return `This action removes a #${id} productFamily`;
  }
}
