<script setup lang="ts"></script>

<template>
  <div>
    <section class="hero-section" id="section_1">
      <div class="section-overlay"></div>

      <div class="container d-flex justify-content-center align-items-center">
        <div class="row">
          <div class="col-12 mt-auto mb-5 text-center">
            <h1 class="text-white mb-5">CAFETERÍA DULCE SABOR</h1>

            <a class="btn custom-btn smoothscroll" href="#section_2">Ver Catálogo</a>
          </div>

          <div class="col-lg-12 col-12 mt-auto d-flex flex-column flex-lg-row text-center">
            <div class="date-wrap">
              <h5 class="text-white">
                <i class="custom-icon bi-clock me-2"></i>
                Abierto: 08:00 AM - 13:00 PM
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div class="video-wrap">
        <video autoplay loop muted class="custom-video" poster="">
          <source src="../assets/video/Coffe.mp4" type="video/mp4" />

          Your browser does not support the video tag.
        </video>
      </div>
    </section>

    <section class="about-section section-padding" id="section_2">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-12 mb-4 mb-lg-0 d-flex align-items-center">
            <div class="services-info">
              <h2 class="text-white mb-4">Sobre Dulce Sabor</h2>

              <p class="text-white">
                Dulce Sabor es más que una cafetería, es un espacio donde cada taza de café cuenta una historia.
                Nos especializamos en blends exclusivos y postres artesanales que deleitan tus sentidos.
              </p>

              <h6 class="text-white mt-4">Café de Especialidad</h6>

              <p class="text-white">
                Seleccionamos los mejores granos de origen único para ofrecerte una experiencia de sabor única e inolvidable.
              </p>

              <h6 class="text-white mt-4">Ambiente Acogedor</h6>

              <p class="text-white">El lugar perfecto para reuniones, trabajo o simplemente disfrutar un momento de tranquilidad.</p>
            </div>
          </div>

          <div class="col-lg-1 col-10">
            <div class="about-text-wrap ms-auto">
              <img
                src="../assets/images/CupCoffe.gif"
                class="img-fluid"
              />
              <div class="about-text-info d-flex justify-content-end align-items-start ms-auto"
                style="position:absolute; top:80px; right:0; width:max-content; max-width:500px;">
                <div class="d-flex">
                  <img
                    src="../assets/images/sandwich.jpg"
                    class="img-fluid"
                    style="max-width: 80px; max-height: 80px; object-fit: contain;"
                  />
                </div>

                <div class="ms-3 text-end">
                  <h3>Comidas de Artesanales</h3>

                  <p class="mb-1">Hechos con ingredientes frescos y pan recién horneado</p>

                </div>
              </div>
              <div class="about-text-info d-flex justify-content-end ms-auto " style="max-width: 500px;">

                <div class="d-flex">
                  <img
                    src="../assets/images/GoodMorning.gif"
                    class="img-fluid"
                    style="max-width: 80px; max-height: 80px; object-fit: contain;"
                  />
                </div>

                <div class="ms-3 text-end">
                  <h3>Momento de Placer</h3>

                  <p class="mb-1">Tu experiencia cafetera única con nosotros</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="products-section section-padding" id="section_3" style="position: relative; overflow: hidden;">
      <!-- Imagen de fondo -->
      <div class="background-image-wrap">
        <img
          src="../assets/images/products/CupCoffe.gif"
          style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;"
          alt="Fondo de productos"
        />
        <div class="section-overlay" style="background: rgba(26, 26, 26, 0.7); z-index: 1;"></div>
      </div>

      <div class="container" style="position: relative; z-index: 2;">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="text-white mb-5">Nuestros Productos</h2>
          </div>
        </div>

        <!-- PRIMERA FILA - Bebidas -->
        <div class="row mb-5">
          <div class="col-12 text-center mb-4">
            <h3 class="text-white">Bebidas</h3>
          </div>

          <!-- Café Espresso -->
          <div class="col-lg-6 col-12 mb-4">
            <div class="product-thumb" style="background: rgba(45, 45, 45, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(111, 78, 55, 0.3);">
              <div class="product-image-wrap">
                <img
                  src="../assets/images/products/Expresso.jpg"
                  class="product-image img-fluid"
                  style="height: 200px; object-fit: cover;"
                />
              </div>

              <div class="product-info p-3">
                <h4 class="text-white">Espresso Premium</h4>
                <p class="mb-2 text-white">Café intenso de granos Arábica seleccionados</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="price text-warning">Bs. 15</span>
                  <button class="btn btn-sm btn-outline-light">Ver detalles</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Cappuccino -->
          <div class="col-lg-6 col-12 mb-4">
            <div class="product-thumb" style="background: rgba(45, 45, 45, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(111, 78, 55, 0.3);">
              <div class="product-image-wrap">
                <img
                  src="../assets/images/products/Capuccino.jpg"
                  class="product-image img-fluid"
                  style="height: 200px; object-fit: cover;"
                />
              </div>

              <div class="product-info p-3">
                <h4 class="text-white">Cappuccino Clásico</h4>
                <p class="mb-2 text-white">Perfecto balance de café, leche y espuma</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="price text-warning">Bs. 20</span>
                  <button class="btn btn-sm btn-outline-light">Ver detalles</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SEGUNDA FILA - Comidas -->
        <div class="row mb-5">
          <div class="col-12 text-center mb-4">
            <h3 class="text-white">Comidas</h3>
          </div>

          <!-- Sandwich -->
          <div class="col-lg-6 col-12 mb-4">
            <div class="product-thumb" style="background: rgba(45, 45, 45, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(111, 78, 55, 0.3);">
              <div class="product-image-wrap">
                <img
                  src="../assets/images/products/Sandwich Artesanal.jpg"
                  class="product-image img-fluid"
                  style="height: 200px; object-fit: cover;"
                />
              </div>

              <div class="product-info p-3">
                <h4 class="text-white">Sandwich Artesanal</h4>
                <p class="mb-2 text-white">Pan recién horneado con ingredientes frescos</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="price text-warning">Bs. 25</span>
                  <button class="btn btn-sm btn-outline-light">Ver detalles</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Ensalada -->
          <div class="col-lg-6 col-12 mb-4">
            <div class="product-thumb" style="background: rgba(45, 45, 45, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(111, 78, 55, 0.3);">
              <div class="product-image-wrap">
                <img
                  src="../assets/images/products/Waffles.jpg"
                  class="product-image img-fluid"
                  style="height: 200px; object-fit: cover;"
                />
              </div>

              <div class="product-info p-3">
                <h4 class="text-white">Wafles de Belgas</h4>
                <p class="mb-2 text-white">Crujientes por fuera, esponjosos por dentro con miel</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="price text-warning">Bs. 22</span>
                  <button class="btn btn-sm btn-outline-light">Ver detalles</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TERCERA FILA - Postres -->
        <div class="row">
          <div class="col-12 text-center mb-4">
            <h3 class="text-white">Postres</h3>
          </div>

          <!-- Torta Chocolate -->
          <div class="col-lg-6 col-12 mb-4">
            <div class="product-thumb" style="background: rgba(45, 45, 45, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(111, 78, 55, 0.3);">
              <div class="product-image-wrap">
                <img
                  src="../assets/images/products/Cake.jpg"
                  class="product-image img-fluid"
                  style="height: 200px; object-fit: cover;"
                />
              </div>

              <div class="product-info p-3">
                <h4 class="text-white">Torta de Chocolate</h4>
                <p class="mb-2 text-white">Elaborada con chocolate belga premium</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="price text-warning">Bs. 18</span>
                  <button class="btn btn-sm btn-outline-light">Ver detalles</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Croissant -->
          <div class="col-lg-6 col-12 mb-4">
            <div class="product-thumb" style="background: rgba(45, 45, 45, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(111, 78, 55, 0.3);">
              <div class="product-image-wrap">
                <img
                  src="../assets/images/products/croissant.jpg"
                  class="product-image img-fluid"
                  style="height: 200px; object-fit: cover;"
                />
              </div>

              <div class="product-info p-3">
                <h4 class="text-white">Croissant Artesanal</h4>
                <p class="mb-2 text-white">Hojaldrado y relleno de almendras</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="price text-warning">Bs. 12</span>
                  <button class="btn btn-sm btn-outline-light">Ver detalles</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
