export class modeloAerolinea {
  constructor(vuelo, fecha, destino, origen, hora, salida, tiempoVuelo, nombre, precio) {
    this.vuelo = vuelo; // ID del vuelo
    this.fecha = fecha;
    this.destino = destino;
    this.origen = origen;
    this.hora = hora;
    this.salida = salida; // mañana, mediodía, tarde, noche
    this.tiempoVuelo = tiempoVuelo;
    this.nombre = nombre;
    this.precio = precio;
    //Cantidad de asientos disponibles
    //Lista de pasJajeros
  }
} 