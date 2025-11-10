import { Injectable, NotFoundException } from '@nestjs/common';

import { Detalle } from './entities/detalle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DetallesService {
  constructor(@InjectRepository(Detalle) private detallesRepository: Repository<Detalle>) {}

  async findAll(): Promise<Detalle[]> {
    return this.detallesRepository.find({
      relations: { venta: true, producto: true },
      select: {
        id: true,
        cantidad: true,
        precioUnitario: true,
        subtotal: true,
        venta: { id: true, fecha: true, total: true },
        producto: { id: true, nombre: true, precio: true },
      },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Detalle> {
    const detalle = await this.detallesRepository.findOne({
      where: { id },
      relations: { venta: true, producto: true },
    });
    if (!detalle) throw new NotFoundException('El detalle de venta no existe');
    return detalle;
  }
}
