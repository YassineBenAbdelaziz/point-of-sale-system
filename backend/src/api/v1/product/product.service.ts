import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductService } from './Iproduct.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, In, Repository, TreeRepository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { FindProductsDto } from './dto/find-all-products.dto';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Category)
    private readonly categoryTreeRepository: TreeRepository<Category>,
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

  async findAll(findProductsDto: FindProductsDto) {
    const { page, limit, parent: parentCategory } = findProductsDto;
    const options: FindManyOptions = {
      skip: (page - 1) * limit,
      take: limit,
    };

    if (parentCategory) {
      const parent = await this.categoryRepository.findOneBy({
        id: parentCategory,
      });

      if (!parent)
        throw new NotFoundException(
          `Parent Category ${parentCategory} not found`,
        );

      const descendantsIds = (
        await this.categoryTreeRepository.findDescendants(parent)
      ).map((descendant) => descendant.id);

      options.where = { id: In([...descendantsIds, parentCategory]) };
    }

    const [result, total] = await this.productRepository.findAndCount(options);

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

  async findByIds(ids: number[]) {
    const products = await this.productRepository.find({
      where: { id: In(ids) },
    });

    const productsMap = new Map(
      products.map((product) => [product.id, product]),
    );

    for (const id of ids) {
      const product = productsMap.get(id);
      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
    }

    return products;
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
