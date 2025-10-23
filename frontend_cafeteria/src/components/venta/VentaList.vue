<script setup lang="ts">
import type { Venta } from '@/models/venta'
import http from '@/plugins/axios'
import { Button, Column, DataTable, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'ventas'
const ventas = ref<Venta[]>([])
const ventaDelete = ref<Venta | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')
const emit = defineEmits(['edit'])
const isDeleting = ref(false)

const ventasFiltrados = computed(() => {
  const busquedaLower = busqueda.value.toLowerCase()
  if (!busquedaLower) {
    return ventas.value
  }
  return ventas.value.filter(
    (venta) =>
      (venta.cliente?.nombre || '').toLowerCase().includes(busquedaLower) ||
      (venta.empleado?.nombre || '').toLowerCase().includes(busquedaLower),
  )
})

async function obtenerLista() {
  try {
    ventas.value = await http.get(ENDPOINT).then((response) => response.data)
  } catch (error) {
    console.error('Error al obtener la lista de ventas:', error)
  }
}

function emitirEdicion(venta: Venta) {
  emit('edit', venta)
}

function mostrarEliminarConfirm(venta: Venta) {
  ventaDelete.value = venta
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  if (isDeleting.value || !ventaDelete.value) return

  isDeleting.value = true
  try {
    const idEliminado = ventaDelete.value.id
    await http.delete(`${ENDPOINT}/${idEliminado}`)
    ventas.value = ventas.value.filter((v) => v.id !== idEliminado)
    mostrarConfirmDialog.value = false
  } catch (error) {
    console.error('Error al eliminar la venta:', error)
  } finally {
    isDeleting.value = false
  }
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
        <InputText v-model="busqueda" type="text" placeholder="Buscar por cliente o empleado" />
      </InputGroup>
    </div>

    <DataTable
      :value="ventasFiltrados"
      paginator
      scrollable
      scrollHeight="flex"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} a {last} de {totalRecords}"
    >
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text @click="obtenerLista" />
      </template>

      <Column field="id" header="Nro. Venta" sortable style="width: 80px"></Column>

      <Column header="Cliente" field="cliente.nombre" sortable style="width: 120px">
        <template #body="{ data }">
          {{ data.cliente?.nombre }}
        </template>
      </Column>

      <Column header="Empleado" field="empleado.nombre" sortable style="width: 120px">
        <template #body="{ data }">
          {{ data.empleado?.nombre }}
        </template>
      </Column>

      <Column field="fecha" header="Fecha" sortable style="width: 80px"></Column>

      <Column field="total" header="Total" sortable style="width: 80px">
        <template #body="{ data }">
          {{
            new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(
              data.total,
            )
          }}
        </template>
      </Column>

      <Column header="Acciones" frozen alignFrozen="right" style="min-width: 100px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(data)" />
          <Button
            icon="pi pi-trash"
            aria-label="Eliminar"
            text
            @click="mostrarEliminarConfirm(data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>
        ¿Estás seguro de que deseas eliminar la <strong>Venta #{{ ventaDelete?.id }}</strong
        >?
      </p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" :loading="isDeleting" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
