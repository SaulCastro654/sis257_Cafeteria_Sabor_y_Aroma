import { Module } from '@nestjs/common';
import { TiposPagoService } from './tipos-pago.service';
import { TiposPagoController } from './tipos-pago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPago } from './entities/tipos-pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoPago])],
  controllers: [TiposPagoController],
  providers: [TiposPagoService],
})
export class TiposPagoModule {}
