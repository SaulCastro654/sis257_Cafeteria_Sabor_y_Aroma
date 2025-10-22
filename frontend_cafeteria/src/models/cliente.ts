import type { Cliente } from '@/models/cliente'

export interface Cliente {
  id: number
  nombre: string
  telefono: string
  correo: string
}
