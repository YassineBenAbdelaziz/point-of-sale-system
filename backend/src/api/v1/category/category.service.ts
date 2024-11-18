import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository, TreeRepository } from 'typeorm';
import { ICategoryService } from './Icategory.service';
import { CreateChildCategoryDto } from './dto/create-child-category.dto';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Category)
    private readonly categoryTreeRepository: TreeRepository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { parentId } = createCategoryDto;
    let parent = null;
    if (parentId) {
      parent = await this.categoryRepository.findOne({
        where: { id: parentId },
      });
      if (!parent) {
        throw new NotFoundException(`Parent Category #${parentId} not found`);
      }
    }
    const category = await this.categoryRepository.create({
      ...createCategoryDto,
      parent,
    });
    return await this.categoryRepository.save(category);
  }

  async findAll(root: boolean) {
    if (root) return await this.categoryTreeRepository.findRoots();
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category: Category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    const children = await this.categoryTreeRepository.findDescendants(
      category,
      {
        depth: 1,
      },
    );
    return { ...category, children: children.filter((e) => e.id !== id) };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category: Category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    await this.categoryRepository.update(id, updateCategoryDto);

    return { ...category, ...updateCategoryDto };
  }

  async remove(id: number) {
    const { affected } = await this.categoryRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Category #${id} not found`);
    }
  }

  async createChildren(
    id: number,
    createChildCategoryDtos: CreateChildCategoryDto[],
  ) {
    const parent = await this.categoryRepository.findOne({ where: { id } });
    if (!parent) {
      throw new NotFoundException(`Parent Category #${id} not found`);
    }

    const categories = createChildCategoryDtos.map((createChildCategoryDto) => {
      return this.categoryRepository.create({
        ...createChildCategoryDto,
        parent,
      });
    });

    return await this.categoryRepository.save(categories);
  }
}
