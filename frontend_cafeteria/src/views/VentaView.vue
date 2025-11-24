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
  color: #e0e0e0 !important;
}

.p-dialog table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #252525;
  border: 1px solid #444;
}

.p-dialog th {
  background-color: #d15801 !important;
  color: #ffffff !important;
  padding: 12px;
}

.p-dialog td {
  color: #ffffff !important;
  border-bottom: 1px solid #444;
  padding: 10px;
}

.total-summary {
  text-align: right;
  margin-top: 1.5rem;
  font-size: 2rem;
  font-weight: 800;
  color: #d15801 !important;
  background-color: #121212;
  padding: 15px;
  border: 1px solid #333;
  border-radius: 8px;
}
</style>
