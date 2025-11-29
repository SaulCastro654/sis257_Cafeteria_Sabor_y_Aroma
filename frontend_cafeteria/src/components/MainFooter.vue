<template>
  <footer class="site-footer" style="position: relative; overflow: hidden">
    <div
      class="video-wrap"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0"
    >
      <img
        src="@/assets/images/Cafeteria.gif"
        style="width: 100%; height: 100%; object-fit: cover"
        alt="Fondo animado de cafetería"
      />
    </div>

    <div class="section-overlay" style="background: rgba(26, 26, 26, 0.85); z-index: 1"></div>

    <div class="site-footer-top" style="position: relative; z-index: 2">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-12">
            <h2 class="text-white mb-lg-0">CAFETERÍA AROMA Y Sabor</h2>
          </div>
          <div class="col-lg-6 col-12 d-flex justify-content-lg-end align-items-center">
            <ul class="social-icon d-flex justify-content-lg-end">
              <li class="social-icon-item">
                <a href="#" class="social-icon-link"><span class="bi-instagram"></span></a>
              </li>
              <li class="social-icon-item">
                <a
                  href="https://www.youtube.com/watch?v=ZZYgp_mr6Ks"
                  target="_blank"
                  class="social-icon-link"
                >
                  <span class="bi-youtube"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="container" style="position: relative; z-index: 2">
      <div class="row">
        <div class="col-lg-6 col-12 mb-4 pb-2">
          <h5 class="site-footer-title mb-3">Enlaces Rápidos</h5>
          <ul class="site-footer-links">
            <li class="site-footer-link-item"><a href="#" class="site-footer-link">Inicio</a></li>
            <li class="site-footer-link-item">
              <a href="#" class="site-footer-link">Nuestros Productos</a>
            </li>
            <li class="site-footer-link-item"><a href="#" class="site-footer-link">Contacto</a></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
          <h5 class="site-footer-title mb-3">Contacto</h5>
          <p class="text-white d-flex mb-1">
            <a href="tel:+591-123-4567" class="site-footer-link">+591 68618554</a>
          </p>
          <p class="text-white d-flex">
            <a href="mailto:hola@dulcesabor.com" class="site-footer-link">hola@dulcesabor.com</a>
          </p>
        </div>

        <div class="col-lg-3 col-md-6 col-11 mb-4 mb-lg-0 mb-md-0">
          <h5 class="site-footer-title mb-3">Ubicación</h5>

          <div style="margin-top: 15px">
            <p class="text-white d-flex mb-1">
              <strong class="me-2">Ciudad:</strong> Sucre, Bolivia
            </p>

            <a
              href="https://www.google.com/maps/place/Aromas+y+sabores/@-19.045113,-65.2599655,823m/data=!3m1!1e3!4m14!1m7!3m6!1s0x93fbcfc3132f0d1f:0xef40ca7e6abfbef8!2sPlaza+25+de+Mayo!8m2!3d-19.0478309!4d-65.2596222!16s%2Fg%2F11f0krgy6y!3m5!1s0x93fbcf0071d7ba21:0x4d938ac06ca53f78!8m2!3d-19.0431282!4d-65.2604078!16s%2Fg%2F11y7431347?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              class="btn btn-warning btn-sm mt-2"
            >
              Ver Ubicación en Google Maps
            </a>
          </div>

          <p class="text-white d-flex mt-3 mb-2">Sucre, Bolivia</p>
        </div>
      </div>
    </div>

    <div class="site-footer-bottom" style="position: relative; z-index: 2">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-12 mt-5">
            <p class="copyright-text text-white text-center">
              Copyright © 2025 Cafetería Aroma y Sabor
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
