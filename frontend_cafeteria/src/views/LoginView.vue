<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/index'

const usuario = ref('')
const clave = ref('')
const error = ref(false)

function onSubmit() {
  const authStore = useAuthStore()
  authStore.login(usuario.value, clave.value).catch(() => (error.value = true))
}
</script>

<template>
  <section class="login-section">
    <div class="section-overlay"></div>

    <div class="container">
      <div class="row justify-content-center align-items-center" style="min-height: 80vh">
        <div class="col-lg-5 col-12">
          <div class="login-form-wrap">
            <h2 class="text-center mb-4 text-white">Bienvenido</h2>

            <form class="custom-form" @submit.prevent="onSubmit">
              <div class="mb-3">
                <label class="text-white mb-2">Usuario</label>
                <input
                  v-model="usuario"
                  type="text"
                  class="form-control"
                  placeholder="Ingresa tu usuario"
                  required
                  autofocus
                />
              </div>

              <div class="mb-4">
                <label class="text-white mb-2">Contraseña</label>
                <input
                  v-model="clave"
                  type="password"
                  class="form-control"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>

              <p v-if="error" class="text-danger text-center mb-3">
                Usuario o contraseña incorrectos
              </p>

              <button type="submit" class="form-control">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.login-section {
  /* Asegúrate de tener esta imagen o cambia el nombre por una que tengas */
  background-image: url('@/assets/images/g1.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 100vh;
}

.login-form-wrap {
  background: rgba(0, 0, 0, 0.75); /* Fondo semitransparente oscuro */
  backdrop-filter: blur(10px); /* Efecto borroso detrás */
  padding: 50px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
}

.form-control {
  background: transparent;
  border: 1px solid #6f4e37;
  color: white;
}

.form-control:focus {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: #d15801;
}

button[type='submit'] {
  background-color: #d15801;
  color: white;
  font-weight: bold;
  border: none;
  margin-top: 20px;
}

button[type='submit']:hover {
  background-color: #a84600;
}
</style>
