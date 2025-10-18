import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta) private ventasRepository: Repository<Venta>,
  ) {}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    let venta = await this.ventasRepository.findOneBy({
      idCliente: createVentaDto.idCliente,
      idEmpleado: createVentaDto.idEmpleado,
      fecha: createVentaDto.fecha,
      total: createVentaDto.total,
    });
    if (venta) throw new ConflictException('La venta ya existe');
    venta = new Venta();
    Object.assign(venta, createVentaDto);
    return this.ventasRepository.save(venta);
  }

  async findAll(parametro?: string): Promise<Venta[]> {
    return this.ventasRepository.find({
      where: { cliente: { nombre: ILike(`%${parametro ?? ''}%`) } },
      relations: { cliente: true, empleado: true },
      select: {
        id: true,
        fecha: true,
        total: true,
        cliente: {
          id: true,
          nombre: true,
          telefono: true,
          correo: true,
        },
        empleado: {
          id: true,
          nombre: true,
          cargo: true,
          fechaIngreso: true,
        },
      },
      order: {cliente: { nombre: 'ASC' }},
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({ 
      where: { id},
      relations: { cliente: true, empleado: true },
    });
    if (!venta) throw new NotFoundException('La venta no existe');
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.findOne(id);
    Object.assign(venta, updateVentaDto);
    return this.ventasRepository.save(venta);
  }

  async remove(id: number): Promise<Venta> {
    const venta = await this.findOne(id);
    return this.ventasRepository.softRemove(venta);
  }
}
