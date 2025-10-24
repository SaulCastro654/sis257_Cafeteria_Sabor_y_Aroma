import type { Producto } from './producto'
import type { Venta } from './venta'

export interface Detalle {
  id: number
  idVenta: string
  idProducto: string
  cantidad: number
  precioUnitario: number
  subtotal: number
  venta: Venta
  producto: Producto
}
