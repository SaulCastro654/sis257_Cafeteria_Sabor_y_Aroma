<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Producto } from '@/models/producto'
import type { Cliente } from '@/models/cliente'
import type { Empleado } from '@/models/empleado'
import type { TipoPago } from '@/models/tipo-pago'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'

import ClienteSave from '@/components/cliente/ClienteSave.vue'

interface DetalleVentaItem {
  idProducto: number
  nombre: string
  precio: number
  cantidad: number
  subtotal?: number
}

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value: boolean) => {
    if (!value) emit('close')
  },
})

const props = defineProps({
  mostrar: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const ENDPOINT_VENTAS = 'ventas'
const ENDPOINT_PRODUCTOS = 'productos'
const ENDPOINT_CLIENTES = 'clientes'
const ENDPOINT_EMPLEADOS = 'empleados'
const ENDPOINT_PAGOS = 'tipos-pago'

const productos = ref<Producto[]>([])
const clientes = ref<Cliente[]>([])
const empleados = ref<Empleado[]>([])
const tiposPago = ref<TipoPago[]>([])
const carrito = ref<DetalleVentaItem[]>([])

const selectedClienteId = ref<number | null>(null)
const selectedEmpleadoId = ref<number | null>(null)
const selectedTipoPagoId = ref<number | null>(null)
const busquedaProducto = ref<string>('')

const mostrarClienteDialog = ref(false)

const productosFiltrados = computed(() => {
  return productos.value.filter(
    (producto) =>
      producto.stock > 0 &&
      producto.nombre.toLowerCase().includes(busquedaProducto.value.toLowerCase()),
  )
})

const empleadosMeseros = computed(() => {
  return empleados.value.filter((e) => e.cargo?.nombre?.toLowerCase().includes('mesero'))
})

const totalVenta = computed(() => {
  return carrito.value.reduce((total, item) => total + item.precio * item.cantidad, 0)
})

function agregarAlCarrito(producto: Producto) {
  if (producto.stock <= 0) {
    alert('No hay suficiente stock disponible')
    return
  }

  const itemExistente = carrito.value.find((item) => item.idProducto === producto.id)

  if (itemExistente) {
    itemExistente.cantidad++
  } else {
    const precioLimpio = Number(producto.precio)
    carrito.value.push({
      idProducto: producto.id,
      nombre: producto.nombre,
      precio: precioLimpio,
      cantidad: 1,
      subtotal: precioLimpio,
    })
  }

  producto.stock--
}

function quitarDelCarrito(idProducto: number) {
  const itemCarrito = carrito.value.find((item) => item.idProducto === idProducto)
  if (!itemCarrito) return

  const productoOriginal = productos.value.find((p) => p.id === idProducto)

  if (productoOriginal) {
    productoOriginal.stock += itemCarrito.cantidad
  }

  carrito.value = carrito.value.filter((item) => item.idProducto !== idProducto)
}

function validarStock(item: DetalleVentaItem) {
  const productoOriginal = productos.value.find((p) => p.id === item.idProducto)
  if (productoOriginal && item.cantidad > productoOriginal.stock) {
    item.cantidad = productoOriginal.stock
    alert('No puedes superar el stock disponible')
  }
}

async function obtenerDatos() {
  productos.value = await http.get(ENDPOINT_PRODUCTOS).then((res) => res.data)
  clientes.value = await http.get(ENDPOINT_CLIENTES).then((res) => res.data)
  empleados.value = await http.get(ENDPOINT_EMPLEADOS).then((res) => res.data)
  tiposPago.value = await http.get(ENDPOINT_PAGOS).then((res) => res.data)
}

function limpiarFormulario() {
  carrito.value = []
  selectedClienteId.value = null
  selectedEmpleadoId.value = null
  selectedTipoPagoId.value = null
  busquedaProducto.value = ''
}

function abrirNuevoCliente() {
  mostrarClienteDialog.value = true
}

async function onClienteGuardado() {
  clientes.value = await http.get(ENDPOINT_CLIENTES).then((res) => res.data)
  mostrarClienteDialog.value = false
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerDatos()
      limpiarFormulario()
    }
  },
)

async function handleSave() {
  if (!selectedClienteId.value) {
    alert('Debe seleccionar un cliente.')
    return
  }
  if (!selectedEmpleadoId.value) {
    alert('Debe seleccionar un empleado.')
    return
  }
  if (!selectedTipoPagoId.value) {
    alert('Debe seleccionar un tipo de pago.')
    return
  }
  if (carrito.value.length === 0) {
    alert('El carrito está vacío.')
    return
  }

  const detallesDto = carrito.value.map((item) => ({
    idProducto: item.idProducto,
    cantidad: item.cantidad,
  }))

  const body = {
    idCliente: selectedClienteId.value,
    idEmpleado: selectedEmpleadoId.value,
    idTipoPago: selectedTipoPagoId.value,
    fecha: new Date().toISOString(),
    detalles: detallesDto,
  }

  try {
    await http.post(ENDPOINT_VENTAS, body)
    emit('guardar')
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar la venta')
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible" header="Crear Nueva Venta" style="width: 60rem" modal>
      <div class="form-grid">
        <div class="field col-12 md:col-4">
          <label for="cliente">Cliente</label>
          <InputGroup>
            <Dropdown
              id="cliente"
              v-model="selectedClienteId"
              :options="clientes"
              optionLabel="nombre"
              optionValue="id"
              placeholder="Seleccione cliente"
              class="w-full"
              filter
            />
            <Button icon="pi pi-plus" severity="success" @click="abrirNuevoCliente" />
          </InputGroup>
        </div>
        <div class="field col-12 md:col-4">
          <label for="empleado">Mesero</label>
          <Dropdown
            id="empleado"
            v-model="selectedEmpleadoId"
            :options="empleadosMeseros"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccione Mesero"
            class="w-full"
            filter
          />
        </div>
        <div class="field col-12 md:col-4">
          <label for="pago">Tipo Pago</label>
          <Dropdown
            id="pago"
            v-model="selectedTipoPagoId"
            :options="tiposPago"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Efectivo / QR..."
            class="w-full"
          />
        </div>
      </div>

      <hr />

      <div class="grid" style="display: flex; gap: 20px">
        <div class="col-6" style="flex: 1">
          <h3>Menú</h3>
          <InputText
            v-model="busquedaProducto"
            placeholder="Buscar producto..."
            class="w-full mb-3"
            style="width: 100%"
          />

          <div class="table-scroll">
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
                <tr v-for="producto in productosFiltrados" :key="producto.id">
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
                    />
                  </td>
                </tr>
                <tr v-if="productosFiltrados.length === 0">
                  <td colspan="4">No hay productos disponibles.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="col-6" style="flex: 1">
          <h3>Carrito</h3>
          <div class="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant.</th>
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
                      style="width: 4rem"
                      @update:modelValue="validarStock(item)"
                    />
                  </td>
                  <td style="font-weight: bold; color: #4caf50">
                    {{ (item.precio * item.cantidad).toFixed(2) }}
                  </td>

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
          </div>

          <div v-if="carrito.length > 0" class="total-summary">
            <h3>Total: {{ Number(totalVenta).toFixed(2) }}</h3>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4" style="display: flex; justify-content: flex-end">
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
    <ClienteSave
      :mostrar="mostrarClienteDialog"
      :modoEdicion="false"
      @guardar="onClienteGuardado"
      @close="mostrarClienteDialog = false"
    />
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}

.field label {
  color: #ffffff !important;
  margin-bottom: 0.5rem;
  display: block;
  font-weight: bold;
}

h3 {
  color: #ffffff !important;
  border-bottom: 1px solid #d15801;
  padding-bottom: 10px;
  margin-bottom: 15px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.table-scroll {
  height: 350px;
  overflow-y: auto;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #1e1e1e;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', sans-serif;
  font-size: 0.95rem;
}

th {
  background-color: #d15801;
  color: #ffffff !important;
  font-weight: bold;
  padding: 12px;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
  text-transform: uppercase;
  font-size: 0.85rem;
}

td {
  padding: 12px;
  border-bottom: 1px solid #333;
  color: #ffffff !important;
  vertical-align: middle;
}

tbody tr:hover {
  background-color: #333333;
}

.subtotal-cell {
  font-weight: bold;
  color: #4caf50 !important;
  font-size: 1rem;
}

.total-summary {
  text-align: right;
  margin-top: 1rem;
  font-size: 1.8rem;
  font-weight: bold;
  color: #d15801 !important;
  padding: 10px;
  border-top: 1px solid #444;
}

.formgrid.grid {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
}
.col-12 {
  flex: 0 0 auto;
  padding: 0.5rem;
  width: 100%;
}
@media (min-width: 768px) {
  .md\:col-4 {
    flex: 0 0 auto;
    width: 33.3333%;
  }
}

.grid {
  display: flex;
  gap: 20px;
}

.col-6 {
  flex: 1;
}

.p-button.p-button-danger.p-button-text {
  color: #ff6b6b !important;
}
.p-button.p-button-danger.p-button-text:hover {
  background: rgba(255, 107, 107, 0.1) !important;
}
</style>
