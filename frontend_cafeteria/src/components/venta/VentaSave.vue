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

const props = defineProps({
  mostrar: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value: boolean) => {
    if (!value) emit('close')
  },
})

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

const montoRecibido = ref<number | null>(null)
const nroComprobante = ref<string>('')

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

const esEfectivo = computed(() => {
  if (!selectedTipoPagoId.value) return false
  const tipo = tiposPago.value.find((t) => t.id === selectedTipoPagoId.value)
  return tipo?.nombre.toLowerCase().includes('efectivo')
})

const esQR = computed(() => {
  if (!selectedTipoPagoId.value) return false
  const tipo = tiposPago.value.find((t) => t.id === selectedTipoPagoId.value)
  return tipo?.nombre.toLowerCase().includes('qr')
})

const cambio = computed(() => {
  if (!montoRecibido.value) return 0
  return montoRecibido.value - totalVenta.value
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
    carrito.value.push({
      idProducto: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      cantidad: 1,
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
  montoRecibido.value = null
  nroComprobante.value = ''
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
    alert('Debe seleccionar un mesero.')
    return
  }
  if (!selectedTipoPagoId.value) {
    alert('Debe seleccionar un método de pago.')
    return
  }
  if (carrito.value.length === 0) {
    alert('El carrito está vacío.')
    return
  }

  if (esEfectivo.value) {
    if (!montoRecibido.value || montoRecibido.value < totalVenta.value) {
      alert('El monto recibido es insuficiente para cubrir el total.')
      return
    }
  }

  if (esQR.value) {
    if (!nroComprobante.value) {
      alert('Debe ingresar el código del comprobante.')
      return
    }
    if (nroComprobante.value.length < 4) {
      alert('El comprobante debe tener al menos 4 caracteres (Ej: 1234).')
      return
    }
  }
  const body = {
    idCliente: selectedClienteId.value,
    idEmpleado: selectedEmpleadoId.value,
    idTipoPago: selectedTipoPagoId.value,
    fecha: new Date().toISOString(),
    detalles: carrito.value.map((item) => ({
      idProducto: item.idProducto,
      cantidad: item.cantidad,
    })),
    montoRecibido: montoRecibido.value,
    nroComprobante: nroComprobante.value,
  }

  try {
    await http.post(ENDPOINT_VENTAS, body)
    emit('guardar')
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al procesar la venta')
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      header="NUEVA VENTA"
      style="width: 95vw; max-width: 1600px"
      modal
      maximizable
      class="custom-modal"
    >
      <div class="formgrid grid p-fluid p-3 mb-3 header-panel">
        <div class="field col-12 md:col-4">
          <label class="text-primary">Cliente</label>
          <InputGroup>
            <Dropdown
              v-model="selectedClienteId"
              :options="clientes"
              optionLabel="nombre"
              optionValue="id"
              placeholder="Seleccione cliente..."
              filter
              class="w-full"
            />
            <Button icon="pi pi-plus" severity="success" @click="abrirNuevoCliente" />
          </InputGroup>
        </div>

        <div class="field col-12 md:col-3">
          <label class="text-primary">Mesero</label>
          <Dropdown
            v-model="selectedEmpleadoId"
            :options="empleadosMeseros"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccione mesero..."
            filter
            class="w-full"
          />
        </div>

        <div class="field col-12 md:col-3">
          <label class="text-primary">Método de Pago</label>
          <Dropdown
            v-model="selectedTipoPagoId"
            :options="tiposPago"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccione pago..."
            class="w-full"
          />
        </div>

        <div class="field col-12 md:col-2 flex align-items-end">
          <div v-if="esEfectivo" class="w-full">
            <label class="text-green-400">Monto Recibido</label>
            <InputNumber
              v-model="montoRecibido"
              mode="decimal"
              :min="0"
              placeholder="0.00"
              class="w-full payment-input"
            />
          </div>
          <div v-if="esQR" class="w-full">
            <label class="text-blue-400">Comprobante</label>
            <InputText
              v-model="nroComprobante"
              placeholder="XXXX"
              class="w-full payment-input"
              maxlength="4"
            />
          </div>
        </div>
      </div>

      <div class="grid h-full" style="min-height: 500px">
        <div class="col-12 lg:col-7 pr-3 border-right-custom">
          <div class="flex justify-content-between align-items-center mb-3">
            <h3 class="m-0 text-white">MENÚ</h3>
            <span class="p-input-icon-left" style="width: 60%">
              <i class="pi pi-search" />
              <InputText
                v-model="busquedaProducto"
                placeholder="Buscar producto..."
                class="w-full"
              />
            </span>
          </div>

          <div class="product-grid custom-scroll">
            <div v-for="p in productosFiltrados" :key="p.id" class="product-card">
              <div class="flex justify-content-between align-items-center">
                <div class="flex flex-column">
                  <span class="product-name">{{ p.nombre }}</span>
                  <span class="product-stock text-gray-400">Stock: {{ p.stock }}</span>
                </div>
                <div class="flex align-items-center gap-3">
                  <span class="product-price">{{ p.precio }} Bs</span>
                  <Button icon="pi pi-plus" rounded size="large" @click="agregarAlCarrito(p)" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 lg:col-5 pl-3 flex flex-column">
          <h3 class="mb-3 text-white">CARRITO</h3>

          <div class="cart-container custom-scroll flex-grow-1">
            <table class="w-full cart-table">
              <thead>
                <tr>
                  <th style="width: 45%">Producto</th>
                  <th style="width: 20%" class="text-center">Cant.</th>
                  <th style="width: 25%" class="text-right">Subtotal</th>
                  <th style="width: 10%"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in carrito" :key="item.idProducto">
                  <td class="product-cell">{{ item.nombre }}</td>
                  <td class="text-center">
                    <InputNumber
                      v-model="item.cantidad"
                      showButtons
                      buttonLayout="horizontal"
                      :step="1"
                      decrementButtonClass="p-button-secondary p-button-sm"
                      incrementButtonClass="p-button-secondary p-button-sm"
                      inputClass="text-center w-3rem p-1"
                      :min="1"
                      :max="100"
                      @update:modelValue="validarStock(item)"
                    >
                      <template #incrementbuttonicon>
                        <span class="pi pi-plus" style="font-size: 0.7rem"></span>
                      </template>
                      <template #decrementbuttonicon>
                        <span class="pi pi-minus" style="font-size: 0.7rem"></span>
                      </template>
                    </InputNumber>
                  </td>
                  <td class="text-right font-bold text-green-400">
                    {{ (item.precio * item.cantidad).toFixed(2) }}
                  </td>
                  <td class="text-right">
                    <Button
                      icon="pi pi-trash"
                      text
                      severity="danger"
                      @click="quitarDelCarrito(item.idProducto)"
                    />
                  </td>
                </tr>
                <tr v-if="carrito.length === 0">
                  <td colspan="4" class="text-center p-5 text-gray-500">
                    <i class="pi pi-shopping-cart text-4xl mb-3"></i>
                    <p>Carrito vacío</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="total-panel mt-3">
            <div class="flex justify-content-between align-items-center mb-2">
              <span class="text-xl text-gray-300">Total a Pagar:</span>
              <span class="text-4xl font-bold text-primary">{{ totalVenta.toFixed(2) }} Bs</span>
            </div>
            <div
              v-if="esEfectivo"
              class="flex justify-content-between align-items-center pt-2 border-top-1 border-gray-700"
            >
              <span class="text-lg text-gray-400">Cambio:</span>
              <span
                :class="cambio >= 0 ? 'text-green-400' : 'text-red-500'"
                class="text-2xl font-bold"
              >
                {{ cambio >= 0 ? cambio.toFixed(2) : 'Falta dinero' }} Bs
              </span>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-content-end gap-3 pt-3 border-top-1 border-gray-800">
          <Button
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            class="px-4"
            @click="dialogVisible = false"
          />
          <Button
            label="CONFIRMAR VENTA"
            icon="pi pi-check"
            severity="success"
            class="px-5 py-3 font-bold text-lg"
            @click="handleSave"
          />
        </div>
      </template>
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
.header-panel {
  background-color: #181818;
  border-radius: 12px;
  border: 1px solid #333;
}

.text-primary {
  color: #d15801 !important;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  display: block;
}

.product-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 5px;
}

.product-card {
  background-color: #222;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #333;
  transition: all 0.2s;
}
.product-card:hover {
  background-color: #2a2a2a;
  border-color: #d15801;
  transform: translateX(5px);
}
.product-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
}
.product-price {
  font-size: 1.2rem;
  color: #d15801;
  font-weight: bold;
}

.cart-container {
  background-color: #1a1a1a;
  border-radius: 10px;
  border: 1px solid #333;
  overflow: hidden;
}

.cart-table th {
  background-color: #222;
  color: #aaa;
  padding: 12px;
  text-transform: uppercase;
  font-size: 0.8rem;
  text-align: left;
}
.cart-table td {
  padding: 10px;
  border-bottom: 1px solid #333;
  vertical-align: middle;
  color: white;
}
.cart-table tr:last-child td {
  border-bottom: none;
}

:deep(.p-inputnumber-input) {
  width: 3rem !important;
  padding: 0.25rem !important;
  font-size: 0.9rem !important;
  border-radius: 0 !important;
}
:deep(.p-inputnumber-button) {
  width: 2rem !important;
}

.total-panel {
  background: linear-gradient(145deg, #1e1e1e, #151515);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #d15801;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.custom-scroll {
  overflow-y: auto;
}
.custom-scroll::-webkit-scrollbar {
  width: 8px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: #1a1a1a;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 4px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #d15801;
}

@media (min-width: 992px) {
  .border-right-custom {
    border-right: 1px solid #333;
  }
}
</style>
