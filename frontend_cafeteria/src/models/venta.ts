import type { Empleado } from './empleado'
import type { Cliente } from './cliente'

export interface Venta {
  id: number
  fecha: Date
  total: number

  idCliente: number
  idEmpleado: number

  cliente: Cliente
  empleado: Empleado
}
