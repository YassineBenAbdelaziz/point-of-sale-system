import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductService } from './Iproduct.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { PaginationParams } from 'src/shared/classes/paginationParams';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { categoryId } = createProductDto;

    let category = null;
    if (categoryId) {
      category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });

      if (!category) {
        throw new NotFoundException(`Category with id ${categoryId} not found`);
      }
    }

    const product = await this.productRepository.create({
      ...createProductDto,
      category,
    });

    await this.productRepository.save(product);
    return product;
  }

  async findAll(paginationParams: PaginationParams) {
    const { page, limit } = paginationParams;
    const [result, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      count: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { categoryId } = updateProductDto;

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    let category = null;
    if (categoryId) {
      category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });

      if (!category) {
        throw new NotFoundException(`Category with id ${categoryId} not found`);
      }
    }

    const updatedProduct = await this.productRepository.create({
      ...product,
      ...updateProductDto,
      category,
    });
    await this.productRepository.save(updatedProduct);
    return updatedProduct;
  }

  async remove(id: number) {
    const { affected } = await this.productRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Product #${id} not found`);
    }
  }
}
