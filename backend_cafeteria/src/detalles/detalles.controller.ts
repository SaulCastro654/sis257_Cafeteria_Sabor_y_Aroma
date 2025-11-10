import { Controller, Get, Param } from '@nestjs/common';
import { DetallesService } from './detalles.service';


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
