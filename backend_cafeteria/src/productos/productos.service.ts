import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    let producto = await this.productosRepository.findOneBy({
      nombre: createProductoDto.nombre.trim(),
      categoria: createProductoDto.categoria.trim(),
      precio: createProductoDto.precio,
      stock: createProductoDto.stock,
      descripcion: createProductoDto.descripcion.trim(),
    });
    if (producto) throw new ConflictException('El producto ya existe');

    producto = new Producto();
    Object.assign(producto, createProductoDto);
    return this.productosRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productosRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOneBy({ id });
    if (!producto) throw new NotFoundException('El producto no existe');
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const { stock, ...restoDeDatos } = updateProductoDto;
    const producto = await this.findOne(id);
    Object.assign(producto, restoDeDatos);
    return this.productosRepository.save(producto);
  }

  async remove(id: number): Promise<Producto> {
    const producto = await this.findOne(id);
    return this.productosRepository.softRemove(producto);
  }
}
