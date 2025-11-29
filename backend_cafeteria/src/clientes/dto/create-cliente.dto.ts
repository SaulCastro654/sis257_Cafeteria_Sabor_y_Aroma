import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre del cliente es obligatorio' })
  @IsString({ message: 'El campo nombre del cliente debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre del cliente no debe ser mayor a 100 caracteres',
  })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El teléfono del cliente es obligatorio' })
  @IsString({
    message: 'El campo teléfono del cliente debe ser de tipo cadena',
  })
  @MaxLength(20, {
    message: 'El campo teléfono del cliente no debe ser mayor a 20 numeros',
  })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly telefono: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El correo del cliente es obligatorio' })
  @IsString({ message: 'El campo correo del cliente debe ser de tipo cadena' })
  @MaxLength(200, {
    message: 'El campo correo del cliente no debe ser mayor a 200 caracteres',
  })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly correo: string;
}
