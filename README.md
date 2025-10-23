# Modelo Entidad–Relación (MER) – Cafetería 

## Descripción del negocio
La Cafetería “Sabor y Aroma” es un negocio dedicado a la venta de café, bebidas calientes y productos de pastelería.  
Este sistema permitirá gestionar los productos, empleados, clientes y las ventas diarias de manera eficiente.

## Entidades principales

### CATEGORIAS
**Atributos:**
- id(PK)
- nombre

### PRODUCTOS
**Atributos:**
- id (PK)
- nombre
- precio
- stock
- descripción
- categoría (FK)

### EMPLEADOS
**Atributos:**
- id (PK)
- nombre
- cargo

### CLIENTES
**Atributos:**
- id (PK)
- nombre
- teléfono
- correo

### VENTAS
**Atributos:**
- id (PK)
- idCliente (FK)
- idEmpleado (FK)
- fecha
- total

### DETALLES
**Atributos:**
- id (PK)
- idVenta (FK)
- idProducto (FK)
- cantidad
- precioUnitario
- subtotal

## Posibles Tecnologías
- PostgreSQL
- NestJS (Backend con JWT)
- Vue.js + Axios + Bootstrap (Frontend)
- Visual Studio Code.

## Integración del equipo
- Integrante 1: Johnny Saul Castro Torricos
- Integrante 2: Subelza Aymuro Edidzon
- Integrante 3: Vasquez Arias Luis Israel
