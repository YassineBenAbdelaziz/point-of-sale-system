import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseIntPipe,
  HttpStatus,
  Query,
  Get,
  Delete,
} from '@nestjs/common';
import { CreatePriceListDto } from './dto/create-price-list.dto';
import { UpdatePriceListDto } from './dto/update-price-list.dto';
import { IPriceListService } from './IPrice-list.service';
import { PaginationParams } from 'src/shared/classes/paginationParams';

@Controller('price-lists')
export class PriceListController {
  constructor(
    @Inject('IPriceListService')
    private readonly priceListService: IPriceListService,
  ) {}

  @Post()
  async create(@Body() createPriceListDto: CreatePriceListDto) {
    return await this.priceListService.create(createPriceListDto);
  }

  @Get()
  async findAll(@Query() paginationParams: PaginationParams) {
    return await this.priceListService.findAll(paginationParams);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.priceListService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePriceListDto: UpdatePriceListDto,
  ) {
    const updatedObject = await this.priceListService.update(
      id,
      updatePriceListDto,
    );
    return {
      message: 'Price list updated',
      statusCode: HttpStatus.ACCEPTED,
      data: updatedObject,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.priceListService.remove(id);
  }
}
