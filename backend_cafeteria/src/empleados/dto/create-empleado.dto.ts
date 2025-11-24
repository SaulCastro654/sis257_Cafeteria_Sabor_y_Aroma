import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly nombre: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo idCargo debe estar definido' })
  @IsInt({ message: 'El campo idCargo debe ser numérico' })
  readonly idCargo: number;
}
