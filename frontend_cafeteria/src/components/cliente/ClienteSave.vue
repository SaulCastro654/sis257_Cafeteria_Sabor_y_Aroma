<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import http from '@/plugins/axios'
import { Button, Dialog, InputText } from 'primevue'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'clientes'
const props = defineProps({
  mostrar: Boolean,
  cliente: {
    type: Object as () => Cliente,
    default: () => ({}) as Cliente,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const cliente = ref<Cliente>({ ...props.cliente })

watch(
  () => props.cliente,
  (newVal) => {
    cliente.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: cliente.value.nombre,
      telefono: cliente.value.telefono,
      correo: cliente.value.correo,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${cliente.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    cliente.value = {} as Cliente
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      if (props.cliente?.id) {
        cliente.value = { ...props.cliente }
      } else {
        cliente.value = {} as Cliente
      }
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Cliente' : 'Nuevo Cliente'"
      style="width: 28rem"
      class="custom-modal"
      modal
    >
      <div class="flex flex-column gap-4 mt-3">
        
        <div class="field">
          <label for="nombre" class="block mb-2 text-gray-400">Nombre Completo</label>
          <div class="p-input-icon-left w-full">
            <i class="pi pi-user" style="color: #d15801" />
            <InputText id="nombre" v-model="cliente.nombre" class="w-full" placeholder="Ej: Juan Pérez" autocomplete="off" />
          </div>
        </div>

        <div class="field">
          <label for="telefono" class="block mb-2 text-gray-400">Teléfono / Celular</label>
          <div class="p-input-icon-left w-full">
            <i class="pi pi-phone" style="color: #d15801" />
            <InputText id="telefono" v-model="cliente.telefono" class="w-full" placeholder="Ej: 77712345" />
          </div>
        </div>

        <div class="field">
          <label for="correo" class="block mb-2 text-gray-400">Correo Electrónico</label>
          <div class="p-input-icon-left w-full">
            <i class="pi pi-envelope" style="color: #d15801" />
            <InputText id="correo" v-model="cliente.correo" class="w-full" placeholder="ejemplo@mail.com" />
          </div>
        </div>

      </div>

      <template #footer>
        <div class="flex justify-content-end gap-2 mt-4">
          <Button label="Cancelar" icon="pi pi-times" text severity="secondary" @click="dialogVisible = false" />
          <Button label="Guardar Cliente" icon="pi pi-check" @click="handleSave" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped></style>
