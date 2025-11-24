import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TiposPagoService } from './tipos-pago.service';
import { CreateTiposPagoDto } from './dto/create-tipos-pago.dto';
import { UpdateTiposPagoDto } from './dto/update-tipos-pago.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('tipos-pago')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tipos-pago')
export class TiposPagoController {
  constructor(private readonly tiposPagoService: TiposPagoService) {}

  @Post()
  create(@Body() createTiposPagoDto: CreateTiposPagoDto) {
    return this.tiposPagoService.create(createTiposPagoDto);
  }

  @Get()
  findAll() {
    return this.tiposPagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposPagoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposPagoDto: UpdateTiposPagoDto) {
    return this.tiposPagoService.update(+id, updateTiposPagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposPagoService.remove(+id);
  }
}
