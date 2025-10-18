import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import {  Repository } from 'typeorm';
import { Detalle } from './entities/detalle.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DetallesService {
  constructor(@InjectRepository(Detalle) private detallesRepository: Repository<Detalle>) {}

  async create(createDetalleDto: CreateDetalleDto): Promise<Detalle> {
    let detalle = await this.detallesRepository.findOneBy({
      idVenta: createDetalleDto.idVenta,
      idProducto: createDetalleDto.idProducto,
      cantidad: createDetalleDto.cantidad,
      precioUnitario: createDetalleDto.precioUnitario,
      subtotal: createDetalleDto.subtotal,
    });
    if (detalle) throw new ConflictException('El detalle de la venta ya existe');

    detalle = new Detalle();
    Object.assign(detalle, createDetalleDto);
    return this.detallesRepository.save(detalle);
  }

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

  async update(id: number, updateDetalleDto: UpdateDetalleDto): Promise<Detalle> {
    const detalle = await this.findOne(id);
    Object.assign(detalle, updateDetalleDto);
    return this.detallesRepository.save(detalle);
  }

  async remove(id: number): Promise<Detalle> {
    const detalle = await this.findOne(id);
    return this.detallesRepository.softRemove(detalle);
  }
}
