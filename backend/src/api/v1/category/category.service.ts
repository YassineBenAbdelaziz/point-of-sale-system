import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category: Category =
      await this.categoryRepository.save(createCategoryDto);

    return {
      message: 'Category created successfully',
      statusCode: 201,
      data: category,
    };
  }

  async findAll() {
    const [results, total] = await this.categoryRepository.findAndCount();

    return {
      message: 'Categories retrieved successfully',
      statusCode: 200,
      count: total,
      data: results,
    };
  }

  async findOne(id: number) {
    const category: Category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return {
      message: 'Category retrieved successfully',
      statusCode: 200,
      data: category,
    };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category: Category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    await this.categoryRepository.update(id, updateCategoryDto);

    return {
      message: 'Category updated successfully',
      statusCode: 200,
      data: { ...category, ...updateCategoryDto },
    };
  }

  async remove(id: number) {
    const { affected } = await this.categoryRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return {
      message: 'Category deleted successfully',
      statusCode: 200,
    };
  }
}
