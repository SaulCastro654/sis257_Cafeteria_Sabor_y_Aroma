import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Detalle } from 'src/detalles/entities/detalle.entity';
import { Empleado } from 'src/empleados/entities/empleado.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer',{name: 'id_cliente'})
  idCliente: number;

  @Column('integer',{ name: 'id_empleado' })
  idEmpleado: number;

  @Column({ name: 'fecha' })
  fecha: Date;

  @Column({ name: 'total', type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.ventas)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;

  @ManyToOne(() => Empleado, (empleado) => empleado.ventas)
  @JoinColumn({ name: 'id_empleado', referencedColumnName: 'id' })
  empleado: Empleado;

  @OneToMany(() => Detalle, (detalle) => detalle.venta)
  detalles: Detalle[];
}
