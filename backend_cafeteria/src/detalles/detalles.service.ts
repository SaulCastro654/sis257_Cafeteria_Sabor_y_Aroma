import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { Repository } from 'typeorm';
import { Detalle } from './entities/detalle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class DetallesService {
  constructor(
    @InjectRepository(Detalle) private detallesRepository: Repository<Detalle>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(createDetalleDto: CreateDetalleDto): Promise<Detalle> {
    const producto = await this.productoRepository.findOneBy({
      id: createDetalleDto.idProducto,
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${createDetalleDto.idProducto} no encontrado`);
    }
    if (producto.stock < createDetalleDto.cantidad) {
      throw new BadRequestException(
        `Stock insuficiente para ${producto.nombre}. Stock actual: ${producto.stock}`,
      );
    }
    const nuevoStock = producto.stock - createDetalleDto.cantidad;
    await this.productoRepository.update(producto.id, { stock: nuevoStock });
    const detalle = this.detallesRepository.create(createDetalleDto);
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
