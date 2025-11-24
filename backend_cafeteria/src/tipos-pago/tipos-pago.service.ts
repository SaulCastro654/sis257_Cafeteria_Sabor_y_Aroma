import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTiposPagoDto } from './dto/create-tipos-pago.dto';
import { UpdateTiposPagoDto } from './dto/update-tipos-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoPago } from './entities/tipos-pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposPagoService {
  constructor(
    @InjectRepository(TipoPago)
    private tiposPagoRepository: Repository<TipoPago>,
  ) {}
  async create(createTipoPagoDto: CreateTiposPagoDto): Promise<TipoPago> {
    const existe = await this.tiposPagoRepository.findOneBy({
      nombre: createTipoPagoDto.nombre.trim(),
    });

    if (existe) throw new ConflictException('El tipo de pago ya existe');

    const tipoPago = new TipoPago();
    Object.assign(tipoPago, createTipoPagoDto);
    return this.tiposPagoRepository.save(tipoPago);
  }

  async findAll(): Promise<TipoPago[]> {
    return this.tiposPagoRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<TipoPago> {
    const tipoPago = await this.tiposPagoRepository.findOneBy({ id });
    if (!tipoPago) throw new NotFoundException('El tipo de pago no existe');
    return tipoPago;
  }

  async update(id: number, updateTipoPagoDto: UpdateTiposPagoDto): Promise<TipoPago> {
    const tipoPago = await this.findOne(id);
    Object.assign(tipoPago, updateTipoPagoDto);
    return this.tiposPagoRepository.save(tipoPago);
  }

  async remove(id: number): Promise<TipoPago> {
    const tipoPago = await this.findOne(id);
    return this.tiposPagoRepository.softRemove(tipoPago);
  }
}
