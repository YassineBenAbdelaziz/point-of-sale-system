import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateChildCategoryDto } from './dto/create-child-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

export interface ICategoryService {
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  findAll(root: boolean): Promise<Category[]>;
  findOne(id: number): Promise<Category>;
  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
  remove(id: number): Promise<void>;
  createChildren(
    id: number,
    createChildCategoryDtos: CreateChildCategoryDto[],
  ): Promise<Category[]>;
}
