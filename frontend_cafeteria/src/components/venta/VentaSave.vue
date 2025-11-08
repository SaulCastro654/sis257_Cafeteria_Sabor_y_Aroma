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
const fechaDate = ref<Date | null>(null)

function formatDateForBackend(date: Date): string {
  return date.toLocaleDateString('en-CA')
}

watch(
  () => props.venta,
  (newVal) => {
    venta.value = { ...newVal }
    if (newVal?.fecha) {
      fechaDate.value = new Date(newVal.fecha)
    } else {
      fechaDate.value = new Date()
    }
  },
  { immediate: true },
)

watch(fechaDate, (newDate) => {
  if (newDate) {
    venta.value.fecha = newDate.toISOString() // Mantener interno como ISO
  }
})

async function obtenerClientes() {
  clientes.value = await http.get('clientes').then((response) => response.data)
}

async function obtenerEmpleados() {
  empleados.value = await http.get('empleados').then((response) => response.data)
}

async function handleSave() {
  try {
    // Validaciones básicas
    if (!idCliente.value || !idEmpleado.value) {
      alert('Debe seleccionar un cliente y un empleado')
      return
    }

    if (!venta.value.total || venta.value.total <= 0) {
      alert('El total debe ser mayor a 0')
      return
    }

    if (!fechaDate.value) {
      alert('La fecha es requerida')
      return
    }

    const body = {
      idCliente: idCliente.value,
      idEmpleado: idEmpleado.value,
      fecha: formatDateForBackend(fechaDate.value), // Usar fecha formateada
      total: Number(venta.value.total),
    }

    console.log('Enviando al backend:', body) // Para debug

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${venta.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    resetForm()
    dialogVisible.value = false
  } catch (error: any) {
    console.error('Error completo:', error)
    if (error.response?.data) {
      console.log('Respuesta del error:', error.response.data)
      alert(`Error ${error.response.status}: ${JSON.stringify(error.response.data)}`)
    } else {
      alert(error?.response?.data?.message || 'Error al guardar la venta')
    }
  }
}

function resetForm() {
  venta.value = {} as Venta
  idCliente.value = 0
  idEmpleado.value = 0
  fechaDate.value = new Date()
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

        if (props.venta.fecha) {
          fechaDate.value = new Date(props.venta.fecha)
        }
      } else {
        idCliente.value = 0
        idEmpleado.value = 0
        venta.value = {
          cliente: { id: 0 },
          empleado: { id: 0 },
          fecha: new Date().toISOString(),
          total: 0,
        } as Venta
        fechaDate.value = new Date()
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
          v-model="fechaDate"
          class="flex-auto"
          dateFormat="dd/mm/yy"
          showIcon
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
        <Button
          type="button"
          label="Guardar"
          icon="pi pi-save"
          @click="handleSave"
          :disabled="!idCliente || !idEmpleado || !venta.total"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
