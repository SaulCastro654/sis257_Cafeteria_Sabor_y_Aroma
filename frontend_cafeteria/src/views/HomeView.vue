<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import type { Producto } from '@/models/producto'

const productos = ref<Producto[]>([])

const imagenesCafe = [
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
]

const imagenDefault =
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'

async function obtenerProductosDestacados() {
  try {
    const response = await http.get('productos')
    productos.value = response.data.filter((p: any) => p.stock > 0).slice(0, 8)
  } catch (error) {
    console.error(error)
  }
}

function getImagen(index: number) {
  return imagenesCafe[index % imagenesCafe.length]
}

function onImageError(event: Event) {
  ;(event.target as HTMLImageElement).src = imagenDefault
}

onMounted(() => {
  obtenerProductosDestacados()
})
</script>

<template>
  <div>
    <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-12 mx-auto">
            <em class="small-text">Bienvenido a</em>
            <h1 class="text-white mt-2 mb-4 pb-2">Cafetería Aroma y Sabor</h1>
            <p class="text-white mb-5">
              El mejor café de Bolivia, preparado con pasión y los mejores granos seleccionados para
              ti.
            </p>
            <a class="btn custom-btn custom-border-btn smoothscroll me-3" href="#galeria">
              Ver Especialidades
            </a>
            <RouterLink to="/productos" class="btn custom-btn smoothscroll">
              Menú Completo
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="hero-video-wrap">
        <img src="@/assets/images/g1.jpg" class="custom-video" alt="" />
        <div class="section-overlay"></div>
      </div>
    </section>

    <section class="gallery-section section-padding" id="galeria">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 text-center mb-5">
            <h2 class="text-white">Nuestras Especialidades</h2>
            <p class="text-white mt-2">Una selección visual de lo que tenemos para ti</p>
          </div>

          <div
            class="col-lg-3 col-md-4 col-sm-6 mb-4"
            v-for="(producto, index) in productos"
            :key="producto.id"
          >
            <div class="gallery-item">
              <img
                :src="getImagen(index)"
                class="img-fluid gallery-image"
                :alt="producto.nombre"
                @error="onImageError"
              />
              <div class="gallery-overlay">
                <h5 class="text-white mb-0 text-truncate">{{ producto.nombre }}</h5>
                <span class="price-tag">{{ producto.precio }} Bs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="about-section section-padding" id="about">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-12 mb-4 mb-lg-0">
            <div class="about-image-wrap h-100">
              <img src="@/assets/images/g1.jpg" class="img-fluid about-image" alt="" />
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <h2 class="mb-4">Nuestra Historia</h2>
            <p>
              En <strong>Aroma y Sabor</strong>, nos dedicamos a brindarte una experiencia única.
              Cada taza cuenta una historia de tradición y excelencia.
            </p>
            <p>
              Ven a disfrutar de un ambiente acogedor, perfecto para trabajar, charlar o simplemente
              relajarte.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.small-text {
  color: #d15801;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-video-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.gallery-section {
  background-color: #121212;
}

.gallery-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 260px;
  background-color: #2a2a2a;

  border: 1px solid rgba(255, 255, 255, 0.1);

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);

  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  cursor: default;
}

.gallery-item:hover {
  transform: translateY(-10px);

  box-shadow: 0 15px 30px rgba(209, 88, 1, 0.25);
  border-color: rgba(209, 88, 1, 0.5);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  display: block;
  filter: brightness(0.9);
}

.gallery-item:hover .gallery-image {
  transform: scale(1.1);
  filter: brightness(1);
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    transparent 100%
  );
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.text-truncate {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.price-tag {
  background: linear-gradient(45deg, #d15801, #ff7b00);
  color: white;
  padding: 6px 14px;
  border-radius: 50px;
  font-weight: bold;
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
