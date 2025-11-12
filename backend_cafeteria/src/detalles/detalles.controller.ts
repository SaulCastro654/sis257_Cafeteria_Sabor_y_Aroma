import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DetallesService } from './detalles.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('detalles')
export class DetallesController {
  constructor(private readonly detallesService: DetallesService) {}


  @Get()
  findAll() {
    return this.detallesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesService.findOne(+id);
  }

}
