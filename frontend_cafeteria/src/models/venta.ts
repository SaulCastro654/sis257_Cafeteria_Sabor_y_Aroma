import type { Cliente } from './cliente'
import type { Empleado } from './empleado'
import type { Detalle } from './detalle'
import type { TipoPago } from './tipo-pago'

export interface Venta {
  id: number
  fecha: string
  total: number
  cliente: Cliente
  empleado: Empleado
  detalles?: Detalle[]
  tipoPago?: TipoPago
  montoRecibido?: number
  nroComprobante?: string
}
