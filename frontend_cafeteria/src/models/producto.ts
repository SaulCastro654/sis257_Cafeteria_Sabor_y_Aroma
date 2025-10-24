import type { Categoria } from './categoria'

export interface Producto {
  id: number
  idCategoria: number
  nombre: string
  precio: number
  stock: number
  descripcion: string
  categoria: Categoria
}
