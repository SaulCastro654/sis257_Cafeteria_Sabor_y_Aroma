<script setup lang="ts">
// Importaciones de Vue y Modelos
import { ref, computed, watch } from 'vue'
import type { Producto } from '@/models/producto'
import type { Cliente } from '@/models/cliente'
import type { Empleado } from '@/models/empleado'
import http from '@/plugins/axios'

// Importaciones de PrimeVue (solo las que usas)
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'

// Interfaz simple para nuestro item del carrito
interface DetalleVentaItem {
  idProducto: number
  nombre: string
  precio: number
  cantidad: number
  subtotal: number
}

// --- Props y Emits (Igual que tu ProductoSave) ---
const props = defineProps({
  mostrar: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

// --- Endpoints del Backend ---
const ENDPOINT_VENTAS = 'ventas'
const ENDPOINT_PRODUCTOS = 'productos'
const ENDPOINT_CLIENTES = 'clientes'
const ENDPOINT_EMPLEADOS = 'empleados'

// --- Estado del Componente (Refs) ---
const productos = ref<Producto[]>([]) // El menú de la cafetería
const clientes = ref<Cliente[]>([])
const empleados = ref<Empleado[]>([])
const carrito = ref<DetalleVentaItem[]>([]) // Los productos a vender

// IDs seleccionados en los <Select>
const selectedClienteId = ref<number | null>(null)
const selectedEmpleadoId = ref<number | null>(null)

// --- Lógica del Dialog (Copiada de tu ProductoSave) ---
const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

// --- Lógica de Negocio (Funciones) ---

// Calcula el total de la venta
const totalVenta = computed(() => {
 return carrito.value.reduce((total, item) => total + Number(item.subtotal), 0)
})

// Agrega un producto del menú al carrito
function agregarAlCarrito(producto: Producto) {
  // 1. Revisa si el producto ya está en el carrito
  const itemExistente = carrito.value.find((item) => item.idProducto === producto.id)

  if (itemExistente) {
    // Si ya está, solo suma la cantidad
    itemExistente.cantidad++
    actualizarSubtotal(itemExistente)
  } else {
    // Si es nuevo, lo agrega al carrito
    carrito.value.push({
      idProducto: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
      subtotal: producto.precio, // Subtotal inicial (precio * 1)
    })
  }
}

// Quita un producto del carrito
function quitarDelCarrito(idProducto: number) {
  carrito.value = carrito.value.filter((item) => item.idProducto !== idProducto)
}

// Se llama cuando se cambia la cantidad en el InputNumber
function actualizarSubtotal(item: DetalleVentaItem) {
  item.subtotal = item.precio * (item.cantidad || 0)
}

// --- Carga de Datos y Limpieza ---

// Carga los datos de los <Select> y del Menú
async function obtenerDatos() {
  productos.value = await http.get(ENDPOINT_PRODUCTOS).then((res) => res.data)
  clientes.value = await http.get(ENDPOINT_CLIENTES).then((res) => res.data)
  empleados.value = await http.get(ENDPOINT_EMPLEADOS).then((res) => res.data)
}

// Resetea el formulario
function limpiarFormulario() {
  carrito.value = []
  selectedClienteId.value = null
  selectedEmpleadoId.value = null
}

// Watch (Copiado de tu ProductoSave)
// Cuando el modal se abre (props.mostrar = true), carga los datos
watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerDatos()
      limpiarFormulario() // Resetea el carrito cada vez que se abre
    }
  },
)

// --- Guardar la Venta ---
async function handleSave() {
  // 1. Validaciones simples (usando alert, como en tu ejemplo)
  if (!selectedClienteId.value) {
    alert('Debe seleccionar un cliente.')
    return
  }
  if (!selectedEmpleadoId.value) {
    alert('Debe seleccionar un empleado.')
    return
  }
  if (carrito.value.length === 0) {
    alert('El carrito está vacío.')
    return
  }

  // 2. Prepara el DTO para el backend
  const detallesDto = carrito.value.map((item) => ({
    idProducto: item.idProducto,
    cantidad: item.cantidad,
  }))

  const body = {
    idCliente: selectedClienteId.value,
    idEmpleado: selectedEmpleadoId.value,
    fecha: new Date().toISOString(), // Usamos la fecha actual (como en tu DTO)
    detalles: detallesDto,
  }

  // 3. Envía al backend
  try {
    await http.post(ENDPOINT_VENTAS, body)
    emit('guardar') // Le avisa al padre que se guardó
    dialogVisible.value = false // Cierra el modal
  } catch (error: any) {
    // Muestra el error del backend (como en tu ProductoSave)
    alert(error?.response?.data?.message || 'Error al guardar la venta')
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible" header="Crear Nueva Venta" style="width: 60rem" modal>
      <div class="form-grid">
        <div class="field">
          <label for="cliente">Cliente</label>
          <Select
            id="cliente"
            v-model="selectedClienteId"
            :options="clientes"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccione un cliente"
            class="w-full"
          />
        </div>
        <div class="field">
          <label for="empleado">Empleado</label>
          <Select
            id="empleado"
            v-model="selectedEmpleadoId"
            :options="empleados"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccione un empleado"
            class="w-full"
          />
        </div>
      </div>

      <hr />

      <div class="grid">
        <div class="col-6">
          <h3>Menú</h3>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="producto in productos" :key="producto.id">
                <td>{{ producto.nombre }}</td>
                <td>{{ producto.precio }}</td>
                <td>{{ producto.stock }}</td>
                <td>
                  <Button
                    icon="pi pi-plus"
                    text
                    rounded
                    aria-label="Agregar"
                    @click="agregarAlCarrito(producto)"
                    :disabled="producto.stock === 0"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-6">
          <h3>Carrito</h3>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carrito" :key="item.idProducto">
                <td>{{ item.nombre }}</td>
                <td>
                  <InputNumber
                    v-model="item.cantidad"
                    mode="decimal"
                    :min="1"
                    :max="100"
                    style="width: 5rem"
                    @update:modelValue="actualizarSubtotal(item)"
                  />
                </td>
                <td>{{ Number(item.subtotal).toFixed(2) }}</td>
                <td>
                  <Button
                    icon="pi pi-trash"
                    text
                    rounded
                    severity="danger"
                    aria-label="Quitar"
                    @click="quitarDelCarrito(item.idProducto)"
                  />
                </td>
              </tr>
              <tr v-if="carrito.length === 0">
                <td colspan="4">El carrito está vacío.</td>
              </tr>
            </tbody>
          </table>

          <div v-if="carrito.length > 0" class="total-summary">
            <h3>Total: {{ Number(totalVenta).toFixed(2) }}</h3>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar Venta" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.field label {
  color: #e0e0e0;
  margin-bottom: 0.5rem;
  display: block;
}

h3 {
  color: #ffffff;
  border-bottom: 1px solid #444;
  padding-bottom: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
}

th {
  background-color: #333;
  color: #ffffff;
  font-weight: bold;
  padding: 12px 15px;
  text-align: left;
  border-bottom: 2px solid #555;
}

td {
  padding: 12px 15px;
  border-bottom: 1px solid #444;
  color: #cccccc;
  vertical-align: middle;
}

tbody tr td[colspan='4'] {
  text-align: center;
  color: #888;
  font-style: italic;
}

.total-summary {
  text-align: right;
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
}
</style>
