<script setup lang="ts">
import type { Venta } from '@/models/venta'
import type { Cliente } from '@/models/cliente' // 1. Importar Cliente
import type { Empleado } from '@/models/empleado' // 2. Importar Empleado
import http from '@/plugins/axios'
// 3. Importar Select, Calendar, InputNumber
import { Button, Calendar, Dialog, InputNumber, Select } from 'primevue'
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

// 4. Refs para las listas de los dropdowns
const clientes = ref<Cliente[]>([])
const empleados = ref<Empleado[]>([])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const venta = ref<Venta>({ ...props.venta })

watch(
  () => props.venta,
  (newVal) => {
    venta.value = { ...newVal }
  },
)

// 5. Funciones para cargar los dropdowns
async function obtenerClientes() {
  clientes.value = await http.get('clientes').then((response) => response.data)
}

async function obtenerEmpleados() {
  empleados.value = await http.get('empleados').then((response) => response.data)
}

async function handleSave() {
  try {
    // 6. El body usa los IDs de la venta (que vienen del v-model)
    const body = {
      idCliente: venta.value.idCliente,
      idEmpleado: venta.value.idEmpleado,
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
    // Aquí deberías usar un Toast
  }
}

// 7. Watch para cargar datos cuando se abre el modal
watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      // Carga las listas para los dropdowns
      obtenerClientes()
      obtenerEmpleados()

      if (props.modoEdicion) {
        // En modo edición, carga la venta que viene del prop
        venta.value = { ...props.venta }
      } else {
        // En modo creación, resetea el formulario
        venta.value = {} as Venta
        // Opcional: puedes pre-seleccionar una fecha
        // venta.value.fecha = new Date()
      }
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Venta' : 'Crear Venta'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="cliente" class="font-semibold w-3">Cliente</label>
        <Select
          id="cliente"
          v-model="venta.idCliente"
          :options="clientes"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
          placeholder="Seleccione un cliente"
          autofocus
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="empleado" class="font-semibold w-3">Empleado</label>
        <Select
          id="empleado"
          v-model="venta.idEmpleado"
          :options="empleados"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
          placeholder="Seleccione un empleado"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="fecha" class="font-semibold w-3">Fecha</label>
        <Calendar
          id="fecha"
          v-model="venta.fecha"
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
          mode="currency"
          currency="BOB"
          locale="es-BO"
          class="flex-auto"
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
