import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductService } from './Iproduct.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { PaginationParams } from 'src/shared/classes/paginationParams';
import { ProductFamily } from '../product-family/entities/product-family.entity';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductFamily)
    private readonly productFamilyRepository: Repository<ProductFamily>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { familyId, categoriesIds } = createProductDto;

    const categories = await this.categoryRepository.findBy({
      id: In(categoriesIds),
    });

    if (categories.length !== categoriesIds.length) {
      throw new NotFoundException(`Some Categories not found`);
    }

    let family = null;
    if (familyId) {
      family = await this.productFamilyRepository.findOne({
        where: { id: familyId },
      });

      if (!family) {
        throw new NotFoundException(
          `Product Family with id ${familyId} not found`,
        );
      }
    }

    const product = await this.productRepository.create({
      ...createProductDto,
      family,
      categories,
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
    const { familyId, categoriesIds } = updateProductDto;

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    let categories = undefined;
    if (categoriesIds) {
      categories = await this.categoryRepository.findBy({
        id: In(categoriesIds),
      });

      if (categories.length !== categoriesIds.length) {
        throw new NotFoundException(`Some Categories not found`);
      }
    }

    let family = null;
    if (familyId) {
      family = await this.productFamilyRepository.findOne({
        where: { id: familyId },
      });

      if (!family) {
        throw new NotFoundException(
          `Product Family with id ${familyId} not found`,
        );
      }
    }

    const updatedProduct = await this.productRepository.create({
      ...product,
      ...updateProductDto,
      family,
      categories,
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
