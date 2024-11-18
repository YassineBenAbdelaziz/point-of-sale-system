import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OverpayService } from './overpay.service';
import { CreateOverpayDto } from './dto/create-overpay.dto';
import { UpdateOverpayDto } from './dto/update-overpay.dto';

@Controller('overpay')
export class OverpayController {
  constructor(private readonly overpayService: OverpayService) {}

  @Post()
  create(@Body() createOverpayDto: CreateOverpayDto) {
    return this.overpayService.create(createOverpayDto);
  }

  @Get()
  findAll() {
    return this.overpayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.overpayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOverpayDto: UpdateOverpayDto) {
    return this.overpayService.update(+id, updateOverpayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.overpayService.remove(+id);
  }
}
