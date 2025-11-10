import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Producto } from '../productos/entities/producto.entity';
import { ILike, Repository, DataSource } from 'typeorm';
import { Detalle } from 'src/detalles/entities/detalle.entity';

@Injectable()
export class VentasService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Venta)
    private ventasRepository: Repository<Venta>,
    @InjectRepository(Detalle)
    private detalleRepository: Repository<Detalle>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let totalVenta = 0;
      const detallesProcesados: Detalle[] = [];
      for (const item of createVentaDto.detalles) {
        const producto = await this.productoRepository.findOneBy({
          id: item.idProducto,
        });

        if (!producto) {
          throw new NotFoundException(`Producto con ID ${item.idProducto} no encontrado.`);
        }

        if (producto.stock < item.cantidad) {
          throw new BadRequestException(`Stock insuficiente para ${producto.nombre}.`);
        }
        producto.stock -= item.cantidad;
        await queryRunner.manager.save(producto);
        const subtotal = item.cantidad * producto.precio;
        totalVenta += subtotal;

        const nuevoDetalle = this.detalleRepository.create({
          idProducto: item.idProducto,
          cantidad: item.cantidad,
          precioUnitario: producto.precio,
          subtotal: subtotal,
        });
        detallesProcesados.push(nuevoDetalle);
      }

      const nuevaVenta = this.ventasRepository.create({
        idCliente: createVentaDto.idCliente,
        idEmpleado: createVentaDto.idEmpleado,
        total: totalVenta,
        fecha: createVentaDto.fecha,
      });
      const ventaGuardada = await queryRunner.manager.save(nuevaVenta);

      for (const detalle of detallesProcesados) {
        detalle.idVenta = ventaGuardada.id;
      }
      await queryRunner.manager.save(detallesProcesados);

      await queryRunner.commitTransaction();
      return ventaGuardada;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(parametro?: string): Promise<Venta[]> {
    return this.ventasRepository.find({
      where: { cliente: { nombre: ILike(`%${parametro ?? ''}%`) } },
      relations: { cliente: true, empleado: true },
      select: {
        id: true,
        fecha: true,
        total: true,
        cliente: { id: true, nombre: true },
        empleado: { id: true, nombre: true, cargo: true },
      },
      order: { fecha: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: {
        cliente: true,
        empleado: true,
        detalles: {
          producto: true,
        },
      },
    });
    if (!venta) throw new NotFoundException('La venta no existe');
    return venta;
  }

  async remove(id: number): Promise<Venta> {
    const venta = await this.findOne(id);
    return this.ventasRepository.softRemove(venta);
  }
}
