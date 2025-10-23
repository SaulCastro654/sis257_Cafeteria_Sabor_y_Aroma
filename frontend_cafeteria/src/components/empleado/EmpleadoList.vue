<script setup lang="ts">
import type { Empleado } from '@/models/empleado'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'empleados'
const empleados = ref<Empleado[]>([])
const empleadoDelete = ref<Empleado | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')
const emit = defineEmits(['edit'])

const empleadosFiltrados = computed(() => {
  const busquedaLower = busqueda.value.toLowerCase()
  if (!busquedaLower) {
    return empleados.value
  }
  return empleados.value.filter((empleado) => {
    const nombreMatch = (empleado.nombre || '').toLowerCase().includes(busquedaLower)
    const cargoMatch = (empleado.cargo || '').toLowerCase().includes(busquedaLower)
    const salarioMatch = (empleado.salario ? String(empleado.salario) : '').includes(busquedaLower)
    const fechaIngresoMatch = (empleado.fechaIngreso ? empleado.fechaIngreso.toString() : '')
      .toLowerCase()
      .includes(busquedaLower)
    return nombreMatch || cargoMatch || salarioMatch || fechaIngresoMatch
  })
})

async function obtenerLista() {
  empleados.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(empleado: Empleado) {
  emit('edit', empleado)
}

function mostrarELiminarConfirm(empleado: Empleado) {
  empleadoDelete.value = empleado
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${empleadoDelete.value?.id}`)
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
        <InputText v-model="busqueda" type="text" placeholder="Buscar empleado" />
      </InputGroup>
    </div>

    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>cargo</th>
          <th>salario</th>
          <th>fechaIngreso</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(empleado, index) in empleadosFiltrados" :key="empleado.id">
          <td>{{ index + 1 }}</td>
          <td>{{ empleado.nombre }}</td>
          <td>{{ empleado.cargo }}</td>
          <td>{{ empleado.salario }}</td>
          <td>{{ new Date(empleado.fechaIngreso).toLocaleDateString() }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(empleado)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarELiminarConfirm(empleado)"
            />
          </td>
        </tr>
        <tr v-if="empleadosFiltrados.length === 0">
          <td colspan="6">No se encontraron empleados.</td>
        </tr>
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar el empleado {{ empleadoDelete?.nombre }}?</p>
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
