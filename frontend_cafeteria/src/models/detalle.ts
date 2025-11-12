import type { Producto } from './producto'

export interface Detalle {
  id: number
  cantidad: number
  precioUnitario: number
  subtotal: number
  producto: Producto
  
}
