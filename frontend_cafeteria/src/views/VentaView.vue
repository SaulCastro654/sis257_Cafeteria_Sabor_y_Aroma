<script setup lang="ts">
import VentaList from '@/components/venta/VentaList.vue'
import VentaSave from '@/components/venta/VentaSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const ventaListRef = ref<typeof VentaList | null>(null)

function handleCreate() {
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  ventaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="m-7">
    <h2>Ventas</h2>
    <Button label="Crear Nueva Venta" icon="pi pi-plus" @click="handleCreate" />

    <VentaList ref="ventaListRef" />

    <VentaSave :mostrar="mostrarDialog" @guardar="handleGuardar" @close="handleCloseDialog" />
  </div>
</template>

<style scoped></style>
