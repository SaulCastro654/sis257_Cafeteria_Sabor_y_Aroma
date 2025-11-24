<script setup lang="ts">
import type { Categoria } from '@/models/categoria'
import type { Producto } from '@/models/producto'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'

import { computed, ref, watch } from 'vue'

const ENDPOINT = 'productos'
const props = defineProps({
  mostrar: Boolean,
  producto: {
    type: Object as () => Producto,
    default: () => ({}) as Producto,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const categorias = ref<Categoria[]>([])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const producto = ref<Producto>({ ...props.producto })
const idCategoria = ref<number | null>(null)

watch(
  () => props.producto,
  (newVal) => {
    producto.value = { ...newVal }
  },
)

async function obtenerCategorias() {
  categorias.value = await http.get('categorias').then((response) => response.data)
}

async function handleSave() {
  try {
    const body = {
      idCategoria: idCategoria.value,
      nombre: producto.value.nombre,
      precio: producto.value.precio,
      stock: producto.value.stock,
      descripcion: producto.value.descripcion,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${producto.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    producto.value = {} as Producto
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerCategorias()
      if (props.modoEdicion && props.producto) {
        producto.value = { ...props.producto }
        idCategoria.value = props.producto.categoria?.id
      } else {
        idCategoria.value = null
        producto.value = { categoria: { id: 0 } } as Producto
      }
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar Producto' : 'Nuevo Producto'"
      style="width: 35rem"
      class="custom-modal"
      modal
    >
      <div class="flex flex-column gap-4 mt-3">
        <div class="field">
          <label for="categoria" class="block mb-2 text-gray-400">Categoría</label>
          <Dropdown
            id="categoria"
            v-model="idCategoria"
            :options="categorias"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccione una categoría"
            class="w-full"
            filter
            autofocus
          />
        </div>

        <div class="field">
          <label for="nombre" class="block mb-2 text-gray-400">Nombre del Producto</label>
          <div class="p-input-icon-left w-full">
            <i class="pi pi-shopping-bag" style="color: #d15801" />
            <InputText
              id="nombre"
              v-model="producto.nombre"
              class="w-full"
              placeholder="Ej: Cappuccino Grande"
              autocomplete="off"
              maxlength="100"
            />
          </div>
        </div>

        <div class="formgrid grid">
          <div class="field col-6">
            <label for="precio" class="block mb-2 text-gray-400">Precio (Bs)</label>
            <div class="p-input-icon-left w-full">
              <i class="pi pi-dollar" style="color: #d15801" />
              <InputNumber
                id="precio"
                v-model="producto.precio"
                mode="decimal"
                :minFractionDigits="2"
                :maxFractionDigits="2"
                :min="0"
                placeholder="0.00"
                class="w-full"
              />
            </div>
          </div>

          <div class="field col-6">
            <label for="stock" class="block mb-2 text-gray-400">Stock Disponible</label>
            <div class="p-input-icon-left w-full">
              <i class="pi pi-box" style="color: #d15801" />
              <InputNumber
                id="stock"
                v-model="producto.stock"
                mode="decimal"
                :maxFractionDigits="0"
                :min="0"
                showButtons
                placeholder="0"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <div class="field">
          <label for="descripcion" class="block mb-2 text-gray-400">Descripción Detallada</label>
          <Textarea
            id="descripcion"
            v-model="producto.descripcion"
            class="w-full"
            autocomplete="off"
            rows="3"
            maxlength="250"
            placeholder="Ingresa detalles del producto..."
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
          <Button label="Guardar Producto" icon="pi pi-check" @click="handleSave" />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.formgrid.grid {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
}
.col-6 {
  flex: 0 0 auto;
  padding: 0.5rem;
  width: 50%;
}
</style>
