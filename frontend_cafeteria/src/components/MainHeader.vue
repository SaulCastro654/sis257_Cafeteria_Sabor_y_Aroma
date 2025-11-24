<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const authStore = useAuthStore()
const location = useRoute()
const isAdmin = computed(() => {
  return !!authStore.token
})
</script>

<template>
  <div>
    <header class="site-header">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-12 d-flex flex-wrap">
            <p class="d-flex me-4 mb-0">
              <i class="bi-person custom-icon me-2"></i>
              <strong class="text-dark">Cafetería Aroma y Sabor</strong>
            </p>
          </div>
        </div>
      </div>
    </header>

    <nav
      class="navbar navbar-expand-lg"
      :class="{ 'navbar-dark': location.path !== '/' }"
      :style="location.path !== '/' ? 'background-color: var(--dark-color)' : ''"
    >
      <div class="container">
        <RouterLink to="/" class="navbar-brand"> Cafetería </RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link click-scroll">Inicio</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link click-scroll">Acerca De</RouterLink>
            </li>

            <template v-if="authStore.token">
              <li class="nav-item">
                <RouterLink to="/productos" class="nav-link click-scroll">Productos</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/clientes" class="nav-link click-scroll">Clientes</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/empleados" class="nav-link click-scroll">Empleados</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/ventas" class="nav-link click-scroll">Ventas</RouterLink>
              </li>
              <li class="nav-item">
                <span class="nav-link click-scroll" style="color: var(--secondary-color)">
                  Hola, {{ authStore.user }}
                </span>
              </li>
            </template>
          </ul>

          <div class="d-lg-flex align-items-center">
            <RouterLink
              v-if="!authStore.token"
              to="/login"
              class="btn custom-btn d-lg-block d-none"
            >
              Iniciar Sesión
            </RouterLink>
            <a
              v-else
              @click="authStore.logout()"
              class="btn custom-btn d-lg-block d-none"
              style="cursor: pointer"
            >
              Salir
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar-toggler {
  background-color: transparent;
}
.hover-orange:hover {
  background-color: #d15801 !important;
  color: white !important;
}
</style>
