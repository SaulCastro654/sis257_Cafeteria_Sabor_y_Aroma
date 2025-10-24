<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import type { Empleado } from '@/models/empleado'
import type { Venta } from '@/models/venta'
import http from '@/plugins/axios'
import { Button, DatePicker, Dialog, InputNumber, Select } from 'primevue'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'ventas'
const props = defineProps({
  mostrar: Boolean,
  venta: {
    type: Object as () => Venta,
    default: () => ({}) as Venta,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const clientes = ref<Cliente[]>([])
const empleados = ref<Empleado[]>([])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const venta = ref<Venta>({ ...props.venta })
const idCliente = ref<number>(0)
const idEmpleado = ref<number>(0)

watch(
  () => props.venta,
  (newVal) => {
    venta.value = { ...newVal }
  },
)

async function obtenerClientes() {
  clientes.value = await http.get('clientes').then((response) => response.data)
}

async function obtenerEmpleados() {
  empleados.value = await http.get('empleados').then((response) => response.data)
}

async function handleSave() {
  try {
    const body = {
      idCliente: idCliente.value,
      idEmpleado: idEmpleado.value,
      fecha: venta.value.fecha,
      total: venta.value.total,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${venta.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    venta.value = {} as Venta
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerClientes()
      obtenerEmpleados()
      if (props.venta?.id) {
        venta.value = { ...props.venta }
        idCliente.value = props.venta.cliente.id
        idEmpleado.value = props.venta.empleado.id
      } else {
        idCliente.value = 0
        idEmpleado.value = 0
        venta.value = { cliente: { id: 0 }, empleado: { id: 0 } } as Venta
      }
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="cliente" class="font-semibold w-3">Cliente</label>
        <Select
          id="cliente"
          v-model="idCliente"
          :options="clientes"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="empleado" class="font-semibold w-3">Empleado</label>
        <Select
          id="empleado"
          v-model="idEmpleado"
          :options="empleados"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fecha" class="font-semibold w-3">Fecha</label>
        <DatePicker
          id="fecha"
          v-model="venta.fecha"
          class="flex-auto"
          autocomplete="off"
          maxlength="40"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="total" class="font-semibold w-3">Total</label>
        <InputNumber
          id="total"
          v-model="venta.total"
          mode="decimal"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          :min="0"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
