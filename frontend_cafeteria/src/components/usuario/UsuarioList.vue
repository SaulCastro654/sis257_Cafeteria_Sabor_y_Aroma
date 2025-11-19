<script setup lang="ts">
import type { Usuario } from '@/models/usuario'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'usuarios'
const usuarios = ref<Usuario[]>([])
const usuarioDelete = ref<Usuario | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')
const emit = defineEmits(['edit'])

const usuariosFiltrados = computed(() => {
  return usuarios.value.filter(
    (usuario) =>
      usuario.usuario.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      usuario.clave.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

async function obtenerLista() {
  usuarios.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(usuario: Usuario) {
  emit('edit', usuario)
}

function mostrarEliminarConfirm(usuario: Usuario) {
  usuarioDelete.value = usuario
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${usuarioDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre o nacionalidad" />
      </InputGroup>
    </div>

    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Usuario</th>
          <th>Clave</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Premium</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(usuario, index) in usuariosFiltrados" :key="usuario.id">
          <td>{{ index + 1 }}</td>
          <td>{{ usuario.usuario }}</td>
          <td>{{ usuario.clave }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.rol }}</td>
          <td>{{ usuario.premium }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(usuario)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(usuario)"
            />
          </td>
        </tr>
        <tr v-if="usuariosFiltrados.length === 0">
          <td colspan="4">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar el usuario {{ usuarioDelete?.usuario }}?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
