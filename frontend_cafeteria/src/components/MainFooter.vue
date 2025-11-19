<template>
  <footer class="site-footer" style="position: relative; overflow: hidden;">
    <!-- Fondo GIF -->
    <div class="video-wrap" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">
      <img
        src="../assets/images/Cafeteria.gif"
        style="width: 100%; height: 100%; object-fit: cover;"
        alt="Fondo animado de cafetería"
      />
    </div>

    <!-- Overlay para mejor legibilidad -->
    <div class="section-overlay" style="background: rgba(26, 26, 26, 0.6); z-index: 1;"></div>

    <div class="site-footer-top" style="position: relative; z-index: 2;">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-12">
            <h2 class="text-white mb-lg-0">CAFETERÍA DULCE SABOR</h2>
          </div>

          <div class="col-lg-6 col-12 d-flex justify-content-lg-end align-items-center">
            <ul class="social-icon d-flex justify-content-lg-end">
              <li class="social-icon-item">
                <a href="#" class="social-icon-link">
                  <span class="bi-twitter"></span>
                </a>
              </li>

              <li class="social-icon-item">
                <a href="#" class="social-icon-link">
                  <span class="bi-apple"></span>
                </a>
              </li>

              <li class="social-icon-item">
                <a href="#" class="social-icon-link">
                  <span class="bi-instagram"></span>
                </a>
              </li>

              <li class="social-icon-item">
                <a href="#" class="social-icon-link">
                  <span class="bi-youtube"></span>
                </a>
              </li>

              <li class="social-icon-item">
                <a href="#" class="social-icon-link">
                  <span class="bi-pinterest"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style="position: relative; z-index: 2;">
      <div class="row">
        <div class="col-lg-6 col-12 mb-4 pb-2">
          <h5 class="site-footer-title mb-3">Enlaces Rápidos</h5>

          <ul class="site-footer-links">
            <li class="site-footer-link-item">
              <a href="#section_1" class="site-footer-link">Inicio</a>
            </li>

            <li class="site-footer-link-item">
              <a href="#section_2" class="site-footer-link">Sobre Nosotros</a>
            </li>

            <li class="site-footer-link-item">
              <a href="#section_3" class="site-footer-link">Nuestros Productos</a>
            </li>

            <li class="site-footer-link-item">
              <a href="#section_5" class="site-footer-link">Planes</a>
            </li>

            <li class="site-footer-link-item">
              <a href="#section_6" class="site-footer-link">Contacto</a>
            </li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
          <h5 class="site-footer-title mb-3">¿Tienes una pregunta?</h5>

          <p class="text-white d-flex mb-1">
            <a href="tel: +591-123-4567" class="site-footer-link"> +591 123 4567 </a>
          </p>

          <p class="text-white d-flex">
            <a href="mailto:hola@dulcesabor.com" class="site-footer-link"> dulcesabor@gmail.com </a>
          </p>
        </div>

        <div class="col-lg-3 col-md-6 col-11 mb-4 mb-lg-0 mb-md-0">
          <h5 class="site-footer-title mb-3">Ubicación</h5>

          <p class="text-white d-flex mt-3 mb-2">
            Sucre, Bolivia - El corazón del café boliviano
          </p>

          <a class="link-fx-1 color-contrast-higher mt-3" href="#section_6" style="color: #c0a080 !important;">
            <span>Ver en Maps</span>
            <svg class="icon" viewBox="0 0 32 32" aria-hidden="true">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="16" cy="16" r="15.5"></circle>
                <line x1="10" y1="18" x2="16" y2="12"></line>
                <line x1="16" y1="12" x2="22" y2="18"></line>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="site-footer-bottom" style="position: relative; z-index: 2;">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-12 mt-5">
            <p class="copyright-text text-white">Copyright © 2024 Cafetería Dulce Sabor</p>
            <p class="copyright-text text-white">
              Hecho con Amor el mejor café de Bolivia
            </p>
          </div>

          <div class="col-lg-8 col-12 mt-lg-5">
            <ul class="site-footer-links">
              <li class="site-footer-link-item">
                <a href="#" class="site-footer-link">Términos &amp; Condiciones</a>
              </li>

              <li class="site-footer-link-item">
                <a href="#" class="site-footer-link">Política de Privacidad</a>
              </li>

              <li class="site-footer-link-item">
                <a href="#" class="site-footer-link">Tu Opinión</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
