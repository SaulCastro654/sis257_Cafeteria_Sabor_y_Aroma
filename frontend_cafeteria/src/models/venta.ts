import type { Cliente } from './cliente'
import type { Empleado } from './empleado'

export interface Venta {
  id: number
  idCliente: number
  idEmpleado: number
  fecha: Date
  total: number
  cliente: Cliente
  empleado: Empleado
}
