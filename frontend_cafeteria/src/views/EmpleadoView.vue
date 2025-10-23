<script setup lang="ts">
import EmpleadoList from '@/components/empleado/EmpleadoList.vue'
import EmpleadoSave from '@/components/empleado/EmpleadoSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const empeladoListRef = ref<typeof EmpleadoList | null>(null)
const empleadoEdit = ref<any>(null)

function handleCreate() {
  empleadoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(producto: any) {
  empleadoEdit.value = producto
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  empeladoListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Empleados</h2>
    <Button label=" Agregar " icon="pi pi-plus" @click="handleCreate" />
    <EmpleadoList ref="empeladoListRef" @edit="handleEdit" />
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
