import { PartialType } from '@nestjs/swagger';
import { CreateTiposPagoDto } from './create-tipos-pago.dto';

export class UpdateTiposPagoDto extends PartialType(CreateTiposPagoDto) {}
