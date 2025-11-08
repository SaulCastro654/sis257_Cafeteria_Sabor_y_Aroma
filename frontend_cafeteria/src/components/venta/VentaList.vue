<script setup lang="ts">
import type { Venta } from '@/models/venta'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'ventas'
const ventas = ref<Venta[]>([])
const ventaDelete = ref<Venta | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')
const emit = defineEmits(['edit'])

const ventasFiltrados = computed(() => {
  const busquedaLower = busqueda.value.toLowerCase()
  if (!busquedaLower) {
    return ventas.value
  }

  return ventas.value.filter((venta) => {
    const totalStr = String(venta.total || '')

    let fechaStr = ''
    try {
      const fecha = new Date(venta.fecha)
      if (!isNaN(fecha.getTime())) {
        fechaStr = fecha.toLocaleDateString()
      }
    } catch (error) {
      fechaStr = ''
    }

    const clienteNombre = venta.cliente?.nombre?.toLowerCase() || ''
    const empleadoNombre = venta.empleado?.nombre?.toLowerCase() || ''

    return (
      clienteNombre.includes(busquedaLower) ||
      empleadoNombre.includes(busquedaLower) ||
      fechaStr.toLowerCase().includes(busquedaLower) ||
      totalStr.includes(busquedaLower)
    )
  })
})

async function obtenerLista() {
  ventas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(venta: Venta) {
  emit('edit', venta)
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
        <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre o cliente" />
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
        <tr v-for="(venta, index) in ventasFiltrados" :key="venta.id">
          <td>{{ index + 1 }}</td>
          <td>{{ venta.cliente.nombre }}</td>
          <td>{{ venta.empleado.nombre }}</td>
          <td>{{ venta.fecha }}</td>
          <td>{{ venta.total }}</td>

          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(venta)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(venta)"
            />
          </td>
        </tr>
        <tr v-if="ventasFiltrados.length === 0">
          <td colspan="6">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar la venta {{ ventaDelete?.fecha }}?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
