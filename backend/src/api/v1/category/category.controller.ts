import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
  HttpStatus,
  ParseArrayPipe,
  BadRequestException,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoryService } from './Icategory.service';
import { Category } from './entities/category.entity';
import { CreateChildCategoryDto } from './dto/create-child-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category: Category =
      await this.categoryService.create(createCategoryDto);

    return {
      message: 'Category created successfully',
      statusCode: HttpStatus.CREATED,
      data: category,
    };
  }

  @Get()
  async findAll(@Query('root', ParseBoolPipe) root: boolean) {
    const categories: Category[] = await this.categoryService.findAll(root);
    return {
      message: 'Categories fetched successfully',
      statusCode: HttpStatus.OK,
      count: categories.length,
      data: categories,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category: Category = await this.categoryService.findOne(id);
    return {
      message: 'Category fetched successfully',
      statusCode: HttpStatus.OK,
      data: category,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updatedCategory: Category = await this.categoryService.update(
      id,
      updateCategoryDto,
    );
    return {
      message: 'Category updated successfully',
      statusCode: HttpStatus.OK,
      data: updatedCategory,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.remove(id);
    return {
      message: 'Category deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Post(':id/children')
  async createChildren(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ParseArrayPipe({ items: CreateChildCategoryDto }))
    createChildCategoryDtos: CreateChildCategoryDto[],
  ) {
    if (createChildCategoryDtos?.length === 0) {
      throw new BadRequestException('At least one child category is required');
    }
    const categories = await this.categoryService.createChildren(
      id,
      createChildCategoryDtos,
    );
    return {
      message: 'Children Categories created successfully',
      statusCode: HttpStatus.CREATED,
      data: categories,
    };
  }
}
