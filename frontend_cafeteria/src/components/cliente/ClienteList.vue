<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText, DataTable, Column } from 'primevue'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'clientes'
const clientes = ref<Cliente[]>([])
const clienteDelete = ref<Cliente | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')
const emit = defineEmits(['edit'])

const clientesFiltrados = computed(() => {
  return clientes.value.filter(
    (cliente: { nombre: string; correo: string }) =>
      cliente.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cliente.correo.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

async function obtenerLista() {
  clientes.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(cliente: Cliente) {
  emit('edit', cliente)
}

function mostrarELiminarConfirm(cliente: Cliente) {
  clienteDelete.value = cliente
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${clienteDelete.value?.id}`)
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
        <InputText
          v-model="busqueda"
          type="text"
          placeholder="Buscar cliente por Nombre"
        />
      </InputGroup>
    </div>

    <DataTable
      :value="clientesFiltrados"
      paginator
      :rows="5"
      dataKey="id"
      :rowsPerPageOptions="[5, 10, 20]"
      tableStyle="min-width: 50rem"
      class="mt-3" >
      <Column header="Nro." style="width: 5rem">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>

      <Column field="nombre" header="Nombre" sortable style="min-width: 10rem"></Column>

      <Column field="telefono" header="Teléfono" style="min-width: 10rem"></Column>

      <Column field="correo" header="Correo" style="min-width: 15rem"></Column>

      <Column header="Acciones" style="width: 10rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="emitirEdicion(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            aria-label="Eliminar"
            class="p-button-rounded p-button-danger"
            @click="mostrarELiminarConfirm(slotProps.data)"
          />
        </template>
      </Column>

      </DataTable>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar el cliente {{ clienteDelete?.nombre }}?</p>
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
