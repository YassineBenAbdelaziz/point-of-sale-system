import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductFamilyDto } from './dto/create-product-family.dto';
import { UpdateProductFamilyDto } from './dto/update-product-family.dto';
import { IProductFamilyService } from './Iproduct-family.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductFamily } from './entities/product-family.entity';

@Injectable()
export class ProductFamilyService implements IProductFamilyService {
  constructor(
    @InjectRepository(ProductFamily)
    private readonly productFamilyRepository: Repository<ProductFamily>,
  ) {}

  async create(createProductFamilyDto: CreateProductFamilyDto) {
    const family = await this.productFamilyRepository.save(
      createProductFamilyDto,
    );
    return family;
  }

  async findAll() {
    const families = await this.productFamilyRepository.find();
    return families;
  }

  async findOne(id: number) {
    const family = await this.productFamilyRepository.findOne({
      where: { id },
    });
    if (!family)
      throw new NotFoundException(`Product Family with id ${id} not found`);

    return family;
  }

  async update(id: number, updateProductFamilyDto: UpdateProductFamilyDto) {
    const family = await this.productFamilyRepository.findOne({
      where: { id },
    });
    if (!family)
      throw new NotFoundException(`Product Family with id ${id} not found`);

    await this.productFamilyRepository.update(id, updateProductFamilyDto);
    return { ...family, ...updateProductFamilyDto };
  }

  async remove(id: number) {
    const { affected } = await this.productFamilyRepository.delete({ id });
    if (affected === 0)
      throw new NotFoundException(`Product Family with id ${id} not found`);
  }
}
