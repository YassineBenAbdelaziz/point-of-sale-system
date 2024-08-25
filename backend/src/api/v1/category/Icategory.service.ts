import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

export interface ICategoryService {
  create(createCategoryDto: CreateCategoryDto): Promise<Category>;
  findAll(): Promise<Category[]>;
  findOne(id: number): Promise<Category>;
  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
  remove(id: number): Promise<void>;
}
