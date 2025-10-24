<script setup lang="ts">
import EmpleadoList from '@/components/empleado/EmpleadoList.vue'
import EmpleadoSave from '@/components/empleado/EmpleadoSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const empleadoListRef = ref<typeof EmpleadoList | null>(null)
const empleadoEdit = ref<any>(null)

function handleCreate() {
  empleadoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(empleado: any) {
  empleadoEdit.value = empleado
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  empleadoListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-7">
    <h2>Empleados</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <EmpleadoList ref="empleadoListRef" @edit="handleEdit" />
    <EmpleadoSave
      :mostrar="mostrarDialog"
      :empleado="empleadoEdit"
      :modoEdicion="!!empleadoEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
