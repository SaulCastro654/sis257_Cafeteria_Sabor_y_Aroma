<script setup lang="ts">
import VentaList from '@/components/venta/VentaList.vue'
import VentaSave from '@/components/venta/VentaSave.vue'
import Button from 'primevue/button' // Tu import de Button estaba en la plantilla pero no aquí, lo agregué
import { ref } from 'vue'

const mostrarDialog = ref(false)
const ventaListRef = ref<typeof VentaList | null>(null)
// const ventaEdit = ref<any>(null) // <-- No se usa

function handleCreate() {
  // ventaEdit.value = null // <-- No se usa
  mostrarDialog.value = true
}

// function handleEdit(venta: any) { ... } // <-- Eliminamos la función de editar

function handleCloseDialog() {
  mostrarDialog.value = false
}

// Esta función es clave: cuando 'VentaSave' emite 'guardar',
// le decimos a 'VentaList' que se actualice.
function handleGuardar() {
  ventaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-7">
    <h2>Ventas</h2>
    <Button label="Crear Nueva Venta" icon="pi pi-plus" @click="handleCreate" />

    <VentaList ref="ventaListRef" />

    <VentaSave
      :mostrar="mostrarDialog"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>