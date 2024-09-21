import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  Query,
  Inject,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PaginationParams } from 'src/shared/classes/paginationParams';
import { IPurchaseService } from './Ipurchase.service';

@Controller('purchases')
export class PurchaseController {
  constructor(
    @Inject('IPurchaseService')
    private readonly purchaseService: IPurchaseService,
  ) {}

  @Post()
  async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    const purchase = await this.purchaseService.create(createPurchaseDto);
    return {
      message: 'Purchase created successfully',
      statusCode: HttpStatus.CREATED,
      data: purchase,
    };
  }

  @Get()
  async findAll(@Query() paginationParams: PaginationParams) {
    const result = await this.purchaseService.findAll(paginationParams);
    return {
      message: 'Purchases retrieved successfully',
      statusCode: HttpStatus.OK,
      ...result,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const purchase = await this.purchaseService.findOne(id);
    return {
      message: 'Purchase retrieved successfully',
      statusCode: HttpStatus.OK,
      data: purchase,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.purchaseService.remove(id);
    return {
      message: 'Purchase deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
