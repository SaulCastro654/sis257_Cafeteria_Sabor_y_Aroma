import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CargosService {
  constructor(
    @InjectRepository(Cargo)
    private cargosRepository: Repository<Cargo>,
  ) {}
  async create(createCargoDto: CreateCargoDto): Promise<Cargo> {
    const existe = await this.cargosRepository.findOneBy({
      nombre: createCargoDto.nombre.trim(),
    });

    if (existe) throw new ConflictException('El cargo ya existe');

    const cargo = new Cargo();
    Object.assign(cargo, createCargoDto);
    return this.cargosRepository.save(cargo);
  }

  async findAll(): Promise<Cargo[]> {
    return this.cargosRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Cargo> {
    const cargo = await this.cargosRepository.findOneBy({ id });
    if (!cargo) throw new NotFoundException('El cargo no existe');
    return cargo;
  }

  async update(id: number, updateCargoDto: UpdateCargoDto): Promise<Cargo> {
    const cargo = await this.findOne(id);
    Object.assign(cargo, updateCargoDto);
    return this.cargosRepository.save(cargo);
  }

  async remove(id: number): Promise<Cargo> {
    const cargo = await this.findOne(id);
    return this.cargosRepository.softRemove(cargo);
  }
}
