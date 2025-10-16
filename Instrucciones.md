# Instrucciones

## Funcionalidades principales
- main
- Registrar pasajeros a vuelo
- Confirmar vuelo o pasajero
- Ver historial de vuelo / pasajero
- Listar vuelos
- Filtrar vuelos
- Agregar vuelo
- Crear pasajero
- Editar vuelo
- Eliminar vuelo (confirmar: ¿Estás seguro que deseas eliminar vuelo?)
- Eliminar o modificar pasajero
- Historial de vuelos

## Descripción de main
main ejecuta las funciones principales:
- Crear un vuelo (cuestionario con prompsync para rellenar datos del objeto vuelo).
- Registrar un pasajero a un vuelo (cuestionario con prompsync para rellenar datos del pasajero: nacionalidad, pasaporte, edad, asiento id, etc.).
- Consultar vuelos: disponibilidad, filtrar por fecha, franja de salida (mañana, mediodía, tarde, noche), nombre de aerolínea, precio.
- Consultar historial de vuelo (filtro por vuelo o pasajero).
- Modificar vuelo (filtrar por pasajero para dar de baja o modificar datos del registro).

## Carpetas y archivos

### Aerolinea
- aerolineaService.js — funciones para crear aerolíneas (ej.: crear aerolíneas a partir de 31/10/2025).
- modeloAerolinea.js — modelado del objeto aerolínea.

### Pasajeros
- (pendiente: describir archivos y modelo de datos)
