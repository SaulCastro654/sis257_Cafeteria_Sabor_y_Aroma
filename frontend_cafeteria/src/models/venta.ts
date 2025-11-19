import type { Cliente } from './cliente'
import type { Empleado } from './empleado'
import type { Detalle } from './detalle'

export interface Venta {
  id: number
  fecha: string
  total: number
  cliente: Cliente
  empleado: Empleado
  detalles?: Detalle[]
}
