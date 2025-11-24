import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCargoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre del cargo es obligatorio' })
  @IsString({ message: 'El nombre del cargo debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El nombre del cargo no debe ser mayor a 50 caracteres',
  })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly nombre: string;
}