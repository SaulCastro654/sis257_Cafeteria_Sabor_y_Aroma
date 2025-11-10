import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';

class DetalleVentaItemDto {
  @ApiProperty()
  @IsNumber({}, { message: 'El idProducto debe ser un número' })
  @IsNotEmpty({ message: 'El idProducto no debe estar vacío' })
  idProducto: number;
  @ApiProperty()
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @IsPositive({ message: 'La cantidad debe ser un número positivo' })
  cantidad: number;
}

export class CreateVentaDto {
  @ApiProperty()
  @IsInt({ message: 'El campo id del cliente debe ser numérico' })
  @IsDefined({ message: 'El campo id del cliente debe estar definido' })
  readonly idCliente: number;

  @ApiProperty()
  @IsInt({ message: 'El campo id del empleado debe ser numérico' })
  @IsDefined({ message: 'El campo id del empleado debe estar definido' })
  readonly idEmpleado: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo fecha debe estar definido' })
  @IsDateString({}, { message: 'El campo fecha debe ser de tipo fecha' })
  readonly fecha: Date;

  @ApiProperty({ type: [DetalleVentaItemDto] }) // <-- ESTE ES EL MÁS IMPORTANTE
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleVentaItemDto)
  readonly detalles: DetalleVentaItemDto[];
}
