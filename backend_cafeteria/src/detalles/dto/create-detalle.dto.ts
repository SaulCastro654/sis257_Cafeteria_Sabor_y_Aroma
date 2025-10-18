import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateDetalleDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo ID de venta debe estar definido' })
  @IsInt({ message: 'El campo ID de venta debe ser un entero' })
  @IsPositive({ message: 'El ID de venta debe ser positivo' })
  idVenta: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo ID de producto debe estar definido' })
  @IsInt({ message: 'El campo ID de producto debe ser un entero' })
  @IsPositive({ message: 'El ID de producto debe ser positivo' })
  idProducto: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo cantidad debe estar definido' })
  @IsInt({ message: 'El campo cantidad debe ser un entero' })
  @IsPositive({ message: 'La cantidad debe ser un número positivo' })
  cantidad: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo precio unitario debe estar definido' })
  @IsNumber({}, { message: 'El precio unitario debe ser un número' })
  @IsPositive({ message: 'El precio unitario debe ser positivo' })
  precioUnitario: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo subtotal debe estar definido' })
  @IsNumber({}, { message: 'El subtotal debe ser un número' })
  @IsPositive({ message: 'El subtotal debe ser positivo' })
  subtotal: number;
}
