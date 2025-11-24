<script setup lang="ts"></script>

<template>
  <div>
    <section class="about-header">
      <div class="section-overlay"></div>
      <div class="container h-100">
        <div class="row h-100 align-items-center justify-content-center">
          <div class="col-12 text-center z-2">
            <h1 class="text-white">Sobre Nosotros</h1>
            <p class="text-white fs-4">Más que café, una experiencia.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding bg-dark text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-12">
            <img
              src="@/assets/images/g1.jpg"
              class="img-fluid rounded-3 shadow-lg mb-4 mb-lg-0"
              alt="Nuestra historia"
            />
          </div>
          <div class="col-lg-6 col-12 ps-lg-5">
            <h2 class="mb-4">Nuestra Historia</h2>
            <p>
              Fundada en el corazón de Sucre, <strong>Aroma y Sabor</strong> nació del deseo de
              crear un espacio donde el tiempo se detiene. Comenzamos con una pequeña máquina de
              espresso y un gran sueño: servir el mejor café de altura de Bolivia.
            </p>
            <p>
              Nos enorgullece trabajar directamente con agricultores locales, asegurando que cada
              grano sea cultivado de manera sostenible y con el máximo cuidado.
            </p>

            <div class="row mt-4">
              <div class="col-6">
                <h3 class="text-primary">5+</h3>
                <p>Años de Experiencia</p>
              </div>
              <div class="col-6">
                <h3 class="text-primary">10k+</h3>
                <p>Tazas Servidas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-padding" style="background-color: #1a1a1a">
      <div class="container">
        <div class="row text-center mb-5">
          <div class="col-12">
            <h2 class="text-white">¿Por qué elegirnos?</h2>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-md-4 col-12">
            <div class="feature-card text-center p-4">
              <div class="icon-box mb-3">
                <i class="bi bi-cup-hot-fill"></i>
              </div>
              <h4 class="text-white">Café Premium</h4>
              <p>Granos seleccionados y tostados a la perfección para un sabor inigualable.</p>
            </div>
          </div>
          <div class="col-md-4 col-12">
            <div class="feature-card text-center p-4">
              <div class="icon-box mb-3">
                <i class="bi bi-wifi"></i>
              </div>
              <h4 class="text-white">Espacio Cowork</h4>
              <p>WiFi de alta velocidad y ambiente tranquilo ideal para trabajar o estudiar.</p>
            </div>
          </div>
          <div class="col-md-4 col-12">
            <div class="feature-card text-center p-4">
              <div class="icon-box mb-3">
                <i class="bi bi-heart-fill"></i>
              </div>
              <h4 class="text-white">Hecho con Amor</h4>
              <p>
                Nuestros baristas ponen pasión en cada detalle, desde el molido hasta el arte latte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-header {
  background-image: url('@/assets/images/g1.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
}

.z-2 {
  position: relative;
  z-index: 2;
}

.text-primary {
  color: #d15801 !important;
  font-weight: bold;
}

.feature-card {
  background-color: #242424;
  border-radius: 15px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid #333;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(209, 88, 1, 0.2);
  border-color: #d15801;
}

.icon-box {
  font-size: 3rem;
  color: #d15801;
}
</style>
