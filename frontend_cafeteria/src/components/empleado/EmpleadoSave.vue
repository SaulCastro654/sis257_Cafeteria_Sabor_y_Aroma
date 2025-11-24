<script setup lang="ts">
import type { Empleado } from '@/models/empleado'
import type { Cargo } from '@/models/cargo'
import http from '@/plugins/axios'
import { Button, Dialog, InputText, Dropdown } from 'primevue'
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

const cargos = ref<Cargo[]>([])
const idCargo = ref<number | null>(null)

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const empleado = ref<Empleado>({ ...props.empleado })

async function obtenerCargos() {
  cargos.value = await http.get('cargos').then((response) => response.data)
}

watch(
  () => props.mostrar,
  async (nuevoValor) => {
    if (nuevoValor) {
      await obtenerCargos()
      if (props.modoEdicion && props.empleado) {
        empleado.value = { ...props.empleado }
        idCargo.value = props.empleado.cargo?.id
      } else {
        empleado.value = {} as Empleado
        idCargo.value = null
      }
    }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: empleado.value.nombre,
      idCargo: idCargo.value,
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
      :header="props.modoEdicion ? 'Editar Empleado' : 'Nuevo Empleado'"
      style="width: 28rem"
      class="custom-modal"
      modal
    >
      <div class="flex flex-column gap-4 mt-3">
        
        <div class="field">
          <label for="nombre" class="block mb-2 text-gray-400">Nombre Completo</label>
          <div class="p-input-icon-left w-full">
            <i class="pi pi-user" style="color: #d15801" />
            <InputText
              id="nombre"
              v-model="empleado.nombre"
              class="w-full"
              placeholder="Ej: Juan Pérez"
              autocomplete="off"
              maxlength="100"
            />
          </div>
        </div>

        <div class="field">
          <label for="cargo" class="block mb-2 text-gray-400">Cargo Asignado</label>
          <Dropdown
            id="cargo"
            v-model="idCargo"
            :options="cargos"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccione un cargo"
            class="w-full"
            filter
          />
        </div>

      </div>

      <template #footer>
        <div class="flex justify-content-end gap-2 mt-4">
          <Button
            label="Cancelar"
            icon="pi pi-times"
            text
            severity="secondary"
            @click="dialogVisible = false"
          />
          <Button 
            label="Guardar Empleado" 
            icon="pi pi-check" 
            @click="handleSave" 
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped></style>