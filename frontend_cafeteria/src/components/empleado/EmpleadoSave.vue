<script setup lang="ts">
import type { Empleado } from '@/models/empleado'
import http from '@/plugins/axios'
import { Button, Calendar, Dialog, InputNumber, InputText } from 'primevue'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'empleados'
const props = defineProps({
  mostrar: Boolean,
  empleado: {
    type: Object as () => Empleado,
    default: () => ({}) as Empleado,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value: boolean) => {
    if (!value) emit('close')
  },
})

const empleado = ref<Empleado>({ ...props.empleado })
watch(
  () => props.empleado,
  (newVal) => {
    empleado.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: empleado.value.nombre,
      cargo: empleado.value.cargo,
      salario: empleado.value.salario,
      fechaIngreso: empleado.value.fechaIngreso,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${empleado.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    empleado.value = {} as Empleado
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Empleado' : 'Crear Empleado'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="empleado.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
          maxlength="100"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="cargo" class="font-semibold w-3">Cargo</label>
        <InputText
          id="cargo"
          v-model="empleado.cargo"
          class="flex-auto"
          autocomplete="off"
          maxlength="20"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="salario" class="font-semibold w-3">Salario</label>
        <InputNumber
          id="salario"
          v-model="empleado.salario"
          mode="currency"
          currency="BOB"
          locale="es-BO"
          class="flex-auto"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="fechaIngreso" class="font-semibold w-3">Fecha de Ingreso</label>
        <Calendar
          id="fechaIngreso"
          v-model="empleado.fechaIngreso"
          class="flex-auto"
          dateFormat="dd/mm/yy"
          showIcon
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
