import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo categoria es obligatorio' })
  @IsString({ message: 'El campo categoria debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo categoria no debe ser mayor a 100 caracteres',
  })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly nombre: string;

}
