# Modelo Entidad–Relación (MER) – Cafetería 

## Descripción del negocio
La Cafetería “Sabor y Aroma” es un negocio dedicado a la venta de café, bebidas calientes y productos de pastelería.  
Este sistema permitirá gestionar los productos, empleados, clientes y las ventas diarias de manera eficiente.

## Entidades principales

### PRODUCTOS
**Atributos:**
- id (PK)
- nombre
- categoría
- precio
- stock
- descripción

### EMPLEADOS
**Atributos:**
- id (PK)
- nombre
- cargo
- salario
- fechaIngreso

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
- Visual Studio

## Integración del equipo
- Integrante 1: Johnny Saul Castro Torricos
- Integrante 2: Subelza Aymuro Edidzon
- Integrante 3: Vasquez Arias Luis Israel
