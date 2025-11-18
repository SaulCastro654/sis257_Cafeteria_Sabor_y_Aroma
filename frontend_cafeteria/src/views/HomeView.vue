<script setup lang="ts"></script>

<template>
  <div>
    <section class="hero-section" id="section_1">
      <div class="section-overlay"></div>

      <div class="container d-flex justify-content-center align-items-center">
        <div class="row">
          <div class="col-12 mt-auto mb-5 text-center">
            <h1 class="text-white mb-5">CAFETERÍA DULCE SABOR</h1>

            <a class="btn custom-btn smoothscroll" href="#section_2">Ver Menú</a>
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

          <div class="col-lg-6 col-12">
            <div class="about-text-wrap">
              <img
                src="../assets/images/About.jpg"
                class="about-image img-fluid"
              />

              <div class="about-text-info d-flex">
                <div class="d-flex">
                  <i class="about-text-icon bi-cup-hot"></i>
                </div>

                <div class="ms-4">
                  <h3>Momento de Placer</h3>

                  <p class="mb-0">tu experiencia cafetera única con nosotros</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="artists-section section-padding" id="section_3">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 text-center">
            <h2 class="mb-4">Nuestros Productos</h2>
          </div>

          <div class="col-lg-5 col-12">
            <div class="artists-thumb">
              <div class="artists-image-wrap">
                <img
                  src="../assets/images/artists/joecalih-UmTZqmMvQcw-unsplash.jpg"
                  class="artists-image img-fluid"
                />
              </div>

              <div class="artists-hover">
                <p>
                  <strong>Producto:</strong>
                  Espresso Premium
                </p>

                <p>
                  <strong>Origen:</strong>
                  Granos Arábica
                </p>

                <p>
                  <strong>Sabor:</strong>
                  Intenso y Aromático
                </p>

                <hr />

                <p class="mb-0">
                  <strong>Precio:</strong>
                  <a href="#">Bs. 15</a>
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-5 col-12">
            <div class="artists-thumb">
              <div class="artists-image-wrap">
                <img
                  src="../assets/images/artists/abstral-official-bdlMO9z5yco-unsplash.jpg"
                  class="artists-image img-fluid"
                />
              </div>

              <div class="artists-hover">
                <p>
                  <strong>Producto:</strong>
                  Cappuccino Clásico
                </p>

                <p>
                  <strong>Origen:</strong>
                  Blend Especial
                </p>

                <p>
                  <strong>Sabor:</strong>
                  Suave y Cremoso
                </p>

                <hr />

                <p class="mb-0">
                  <strong>Precio:</strong>
                  <a href="#">Bs. 20</a>
                </p>
              </div>
            </div>

            <div class="artists-thumb">
              <img
                src="../assets/images/artists/soundtrap-rAT6FJ6wltE-unsplash.jpg"
                class="artists-image img-fluid"
              />

              <div class="artists-hover">
                <p>
                  <strong>Producto:</strong>
                  Torta Chocolate
                </p>

                <p>
                  <strong>Ingredientes:</strong>
                  Chocolate Belga
                </p>

                <p>
                  <strong>Tipo:</strong>
                  Postre Artesanal
                </p>

                <hr />

                <p class="mb-0">
                  <strong>Precio:</strong>
                  <a href="#">Bs. 25</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="schedule-section section-padding" id="section_4">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="text-white mb-4">Horario de Servicios</h2>

            <div class="table-responsive">
              <table class="schedule-table table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Día</th>

                    <th scope="col">Lunes a Viernes</th>

                    <th scope="col">Sábado</th>

                    <th scope="col">Domingo</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th scope="row">Mañana</th>

                    <td class="table-background-image-wrap pop-background-image">
                      <h3>Desayunos</h3>

                      <p class="mb-2">7:00 - 11:00 AM</p>

                      <p>Café + Pastelería</p>

                      <div class="section-overlay"></div>
                    </td>

                    <td style="background-color: #f3dcd4"></td>

                    <td class="table-background-image-wrap rock-background-image">
                      <h3>Brunch Especial</h3>

                      <p class="mb-2">9:00 - 12:00 PM</p>

                      <p>Menú Completo</p>

                      <div class="section-overlay"></div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">Tarde</th>

                    <td style="background-color: #ecc9c7"></td>

                    <td>
                      <h3>Almuerzos</h3>

                      <p class="mb-2">12:00 - 3:00 PM</p>

                      <p>Platos del Día</p>
                    </td>

                    <td style="background-color: #d9e3da"></td>
                  </tr>

                  <tr>
                    <th scope="row">Noche</th>

                    <td class="table-background-image-wrap country-background-image">
                      <h3>Merienda</h3>

                      <p class="mb-2">4:00 - 7:00 PM</p>

                      <p>Café + Postres</p>

                      <div class="section-overlay"></div>
                    </td>

                    <td style="background-color: #d1cfc0"></td>

                    <td>
                      <h3>Especial Nocturno</h3>

                      <p class="mb-2">6:00 - 9:00 PM</p>

                      <p>Cocteles de Café</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pricing-section section-padding section-bg" id="section_5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-12 mx-auto">
            <h2 class="text-center mb-4">Planes que Amarás</h2>
          </div>

          <div class="col-lg-6 col-12">
            <div class="pricing-thumb">
              <div class="d-flex">
                <div>
                  <h3><small>Plan Básico</small> Bs. 50</h3>

                  <p>Incluye beneficios:</p>
                </div>

                <p class="pricing-tag ms-auto">Ahorra hasta <span>30%</span></p>
              </div>

              <ul class="pricing-list mt-3">
                <li class="pricing-list-item">4 cafés premium del mes</li>

                <li class="pricing-list-item">2 postres artesanales</li>

                <li class="pricing-list-item">Wi-Fi gratuito ilimitado</li>

                <li class="pricing-list-item">Descuento en compras</li>
              </ul>

              <a class="link-fx-1 color-contrast-higher mt-4" href="ticket.html">
                <span>Suscribirse</span>
                <svg class="icon" viewBox="0 0 32 32" aria-hidden="true">
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="16" cy="16" r="15.5"></circle>
                    <line x1="10" y1="18" x2="16" y2="12"></line>
                    <line x1="16" y1="12" x2="22" y2="18"></line>
                  </g>
                </svg>
              </a>
            </div>
          </div>

          <div class="col-lg-6 col-12 mt-4 mt-lg-0">
            <div class="pricing-thumb">
              <div class="d-flex">
                <div>
                  <h3><small>Plan Premium</small> Bs. 100</h3>

                  <p>¿Qué hace premium a Dulce Sabor?</p>
                </div>
              </div>

              <ul class="pricing-list mt-3">
                <li class="pricing-list-item">8 cafés premium del mes</li>

                <li class="pricing-list-item">4 postres artesanales</li>

                <li class="pricing-list-item">Acceso a zona VIP</li>

                <li class="pricing-list-item">Talleres de barista</li>

                <li class="pricing-list-item">Descuentos exclusivos</li>
              </ul>

              <a class="link-fx-1 color-contrast-higher mt-4" href="ticket.html">
                <span>Suscribirse</span>
                <svg class="icon" viewBox="0 0 32 32" aria-hidden="true">
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="16" cy="16" r="15.5"></circle>
                    <line x1="10" y1="18" x2="16" y2="12"></line>
                    <line x1="16" y1="12" x2="22" y2="18"></line>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-section section-padding" id="section_6">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-12 mx-auto">
            <h2 class="text-center mb-4">¿Tienes alguna pregunta?</h2>

            <nav class="d-flex justify-content-center">
              <div
                class="nav nav-tabs align-items-baseline justify-content-center"
                id="nav-tab"
                role="tablist"
              >
                <button
                  class="nav-link active"
                  id="nav-ContactForm-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-ContactForm"
                  type="button"
                  role="tab"
                  aria-controls="nav-ContactForm"
                  aria-selected="false"
                >
                  <h5>Formulario de Contacto</h5>
                </button>

                <button
                  class="nav-link"
                  id="nav-ContactMap-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-ContactMap"
                  type="button"
                  role="tab"
                  aria-controls="nav-ContactMap"
                  aria-selected="false"
                >
                  <h5>Ubicación</h5>
                </button>
              </div>
            </nav>

            <div class="tab-content shadow-lg mt-5" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-ContactForm"
                role="tabpanel"
                aria-labelledby="nav-ContactForm-tab"
              >
                <form
                  class="custom-form contact-form mb-5 mb-lg-0"
                  action="#"
                  method="post"
                  role="form"
                >
                  <div class="contact-form-body">
                    <div class="row">
                      <div class="col-lg-6 col-md-6 col-12">
                        <input
                          type="text"
                          name="contact-name"
                          id="contact-name"
                          class="form-control"
                          placeholder="Nombre completo"
                          required
                        />
                      </div>

                      <div class="col-lg-6 col-md-6 col-12">
                        <input
                          type="email"
                          name="contact-email"
                          id="contact-email"
                          pattern="[^ @]*@[^ @]*"
                          class="form-control"
                          placeholder="Correo electrónico"
                          required
                        />
                      </div>
                    </div>

                    <input
                      type="text"
                      name="contact-company"
                      id="contact-company"
                      class="form-control"
                      placeholder="Asunto"
                      required
                    />

                    <textarea
                      name="contact-message"
                      rows="3"
                      class="form-control"
                      id="contact-message"
                      placeholder="Mensaje"
                    ></textarea>

                    <div class="col-lg-4 col-md-10 col-8 mx-auto">
                      <button type="submit" class="form-control">Enviar mensaje</button>
                    </div>
                  </div>
                </form>
              </div>

              <div
                class="tab-pane fade"
                id="nav-ContactMap"
                role="tabpanel"
                aria-labelledby="nav-ContactMap-tab"
              >
                <iframe
                  class="google-map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.215260963082!2d-63.25594992501805!3d-17.807382783114957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e6c3c0000001%3A0x5f3b3c3c3c3c3c3c!2sSucre%2C%20Bolivia!5e0!3m2!1ses!2sbo!4v1234567890123!5m2!1ses!2sbo"
                  width="100%"
                  height="450"
                  style="border: 0"
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
