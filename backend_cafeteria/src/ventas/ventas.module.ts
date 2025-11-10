import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';

import { Producto } from '../productos/entities/producto.entity';
import { Detalle } from 'src/detalles/entities/detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, Detalle, Producto])],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
