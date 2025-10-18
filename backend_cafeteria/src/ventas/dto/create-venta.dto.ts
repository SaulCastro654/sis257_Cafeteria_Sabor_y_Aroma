import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

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

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo total es obligatorio' })
  @IsInt({ message: 'El campo total debe ser numérico' })
  @IsPositive({ message: 'El total debe ser un número positivo' })
  readonly total: number;
}
