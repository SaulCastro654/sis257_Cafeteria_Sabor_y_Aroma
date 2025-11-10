<script setup lang="ts">
import type { Venta } from '@/models/venta'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
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

async function mostrarDetalles(venta: Venta) {
  try {
    const response = await http.get(`${ENDPOINT}/${venta.id}`)
    ventaSeleccionada.value = response.data
    mostrarDetallesDialog.value = true
  } catch (error) {
    console.error('Error al cargar los detalles:', error)
    alert('No se pudieron cargar los detalles de la venta.')
  }
}


async function eliminar() {
  await http.delete(`${ENDPOINT}/${ventaDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v...model="busqueda" type="text" placeholder="Buscar por cliente o empleado" />
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
          <td>{{ venta.total }}</td>
          <td>
            <Button
              icon="pi pi-eye"
              aria-label="Ver Detalles"
              text
              @click="mostrarDetalles(venta)"
            />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(venta)"
            />
          </td>
        </tr>
        <tr v-if="ventasFiltradas.length === 0">
          <td colspan="6">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Cancelación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas cancelar la venta con ID {{ ventaDelete?.id }}?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cerrar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Sí, Cancelar" @click="eliminar" />
      </div>
    </Dialog>

    <Dialog
      v-model:visible="mostrarDetallesDialog"
      header="Detalles de la Venta"
      :style="{ width: '40rem' }"
      modal
    >
      <div v-if="ventaSeleccionada">
        <p><strong>Cliente:</strong> {{ ventaSeleccionada.cliente.nombre }}</p>
        <p><strong>Empleado:</strong> {{ ventaSeleccionada.empleado.nombre }}</p>
        <p><strong>Fecha:</strong> {{ new Date(ventaSeleccionada.fecha).toLocaleString() }}</p>

        <h4>Productos Comprados:</h4>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detalle in ventaSeleccionada.detalles" :key="detalle.id">
              <td>{{ detalle.producto.nombre }}</td>
              <td>{{ detalle.cantidad }}</td>
              <td>{{ detalle.precioUnitario }}</td>
              <td>{{ detalle.subtotal }}</td>
            </tr>
          </tbody>
        </table>

        <h3 class="total-summary">Total: {{ ventaSeleccionada.total }}</h3>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          label="Cerrar"
          severity="secondary"
          @click="mostrarDetallesDialog = false"
        />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
  color: #e0e0e0;
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
}

tbody tr:nth-of-type(even) {
  background-color: #2c2c2c;
}

tbody tr:hover {
  background-color: #4a4a4a;
}

.total-summary {
  text-align: right;
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
}
</style>
