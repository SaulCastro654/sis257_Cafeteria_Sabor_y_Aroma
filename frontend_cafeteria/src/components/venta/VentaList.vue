<script setup lang="ts">
import type { Venta } from '@/models/venta'
import http from '@/plugins/axios'
import { Button, Dialog, InputText, InputGroup, InputGroupAddon } from 'primevue'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'ventas'
const ventas = ref<Venta[]>([])
const ventaDelete = ref<Venta | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

const ventaSeleccionada = ref<Venta | null>(null)
const mostrarDetallesDialog = ref<boolean>(false)

const ventasFiltradas = computed(() => {
  return ventas.value.filter(
    (venta) =>
      venta.cliente.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      venta.empleado.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

async function obtenerLista() {
  ventas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function mostrarEliminarConfirm(venta: Venta) {
  ventaDelete.value = venta
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${ventaDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

async function mostrarDetalles(venta: Venta) {
  try {
    const response = await http.get(`${ENDPOINT}/${venta.id}`)
    ventaSeleccionada.value = response.data
    mostrarDetallesDialog.value = true
  } catch (error) {
    console.error(error)
    alert('No se pudieron cargar los detalles de la venta.')
  }
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-12 md:col-6 lg:col-4 pl-0 mt-3 mb-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por cliente o empleado" />
      </InputGroup>
    </div>

    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Cliente</th>
          <th>Empleado</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(venta, index) in ventasFiltradas" :key="venta.id">
          <td>{{ index + 1 }}</td>
          <td>{{ venta.cliente.nombre }}</td>
          <td>{{ venta.empleado.nombre }}</td>
          <td>{{ new Date(venta.fecha).toLocaleString() }}</td>
          <td>{{ venta.total }} Bs</td>
          <td>
            <Button
              icon="pi pi-eye"
              text
              severity="info"
              aria-label="Ver Detalles"
              @click="mostrarDetalles(venta)"
            />
            <Button
              icon="pi pi-trash"
              text
              severity="danger"
              aria-label="Eliminar"
              @click="mostrarEliminarConfirm(venta)"
            />
          </td>
        </tr>
        <tr v-if="ventasFiltradas.length === 0">
          <td colspan="6" class="text-center">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Cancelación"
      :style="{ width: '25rem' }"
      modal
    >
      <p>¿Estás seguro de que deseas cancelar la venta con ID {{ ventaDelete?.id }}?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cerrar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Sí, Cancelar" severity="danger" @click="eliminar" />
      </div>
    </Dialog>

    <Dialog
      v-model:visible="mostrarDetallesDialog"
      header="Detalles de la Venta"
      :style="{ width: '50rem' }"
      modal
      class="details-modal"
    >
      <div v-if="ventaSeleccionada">
        <div class="grid mb-4 pb-3" style="border-bottom: 1px solid #444">
          <div class="col-6">
            <p>
              <strong>Cliente:</strong>
              <span class="text-primary">{{ ventaSeleccionada.cliente.nombre }}</span>
            </p>
            <p><strong>Atendido por:</strong> {{ ventaSeleccionada.empleado.nombre }}</p>
            <p><strong>Fecha:</strong> {{ new Date(ventaSeleccionada.fecha).toLocaleString() }}</p>
          </div>

          <div class="col-6 text-right" style="text-align: right">
            <p>
              <strong>Método:</strong>
              <span class="text-orange-500 font-bold uppercase">
                {{ ventaSeleccionada.tipoPago?.nombre || 'No especificado' }}
              </span>
            </p>

            <template v-if="ventaSeleccionada.tipoPago?.nombre.toLowerCase().includes('efectivo')">
              <p v-if="ventaSeleccionada.montoRecibido">
                <strong>Recibido:</strong> {{ ventaSeleccionada.montoRecibido }} Bs
              </p>
              <p v-if="ventaSeleccionada.montoRecibido">
                <strong>Cambio:</strong>
                <span class="text-green-500 font-bold">
                  {{ (ventaSeleccionada.montoRecibido - ventaSeleccionada.total).toFixed(2) }} Bs
                </span>
              </p>
            </template>

            <template v-if="ventaSeleccionada.tipoPago?.nombre.toLowerCase().includes('qr')">
              <p>
                <strong>Comprobante:</strong>
                <span class="text-blue-400">{{ ventaSeleccionada.nroComprobante || '---' }}</span>
              </p>
            </template>
          </div>
        </div>

        <h4>Productos Comprados</h4>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th class="text-center">Cant.</th>
              <th class="text-right">P. Unit</th>
              <th class="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detalle in ventaSeleccionada.detalles" :key="detalle.id">
              <td>{{ detalle.producto.nombre }}</td>
              <td class="text-center">{{ detalle.cantidad }}</td>
              <td class="text-right">{{ detalle.precioUnitario }}</td>
              <td class="text-right font-bold text-white">{{ detalle.subtotal }}</td>
            </tr>
          </tbody>
        </table>

        <div class="total-summary mt-3">Total: {{ ventaSeleccionada.total }} Bs</div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          label="Cerrar"
          icon="pi pi-times"
          severity="secondary"
          @click="mostrarDetallesDialog = false"
        />
      </div>
    </Dialog>
  </div>
</template>

<style>
.p-dialog .p-dialog-content {
  background-color: #1e1e1e !important;
}

.p-dialog h4 {
  color: #ffffff !important;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #d15801;
  padding-bottom: 8px;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 1px;
}

.p-dialog p,
.p-dialog strong,
.p-dialog span,
.p-dialog div {
  color: #e0e0e0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
  background-color: #1e1e1e;
  color: #e0e0e0;
}

th {
  background-color: #d15801 !important;
  color: #ffffff !important;
  font-weight: bold;
  padding: 12px 15px;
  text-align: left;
}

td {
  padding: 12px 15px;
  border-bottom: 1px solid #444;
  color: #cccccc;
}

tbody tr:nth-of-type(even) {
  background-color: #252525;
}

tbody tr:hover {
  background-color: #333;
}

.total-summary {
  text-align: right;
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: 800;
  color: #d15801 !important;
  background-color: #121212;
  padding: 15px;
  border: 1px solid #333;
  border-radius: 8px;
}

.text-primary {
  color: #d15801 !important;
}
.text-orange-500 {
  color: #ff9800 !important;
}
.text-green-500 {
  color: #4caf50 !important;
}
.text-blue-400 {
  color: #60a5fa !important;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.uppercase {
  text-transform: uppercase;
}

.grid {
  display: flex;
  width: 100%;
}
.col-6 {
  width: 50%;
}
</style>
