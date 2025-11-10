import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
//import { UpdateVentaDto } from './dto/update-venta.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }

  @Get()
  @ApiQuery({ name: 'parametro', required: false })
  findAll(@Query('parametro', new DefaultValuePipe('')) parametro?: string) {
    return this.ventasService.findAll(parametro);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventasService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
  //   return this.ventasService.update(+id, updateVentaDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventasService.remove(+id);
  }
}
