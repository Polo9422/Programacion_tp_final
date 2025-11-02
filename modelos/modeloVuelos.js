export class ModeloVuelos {
  constructor(id, nombreVuelo, origen, destino, fechaSalida, duracion, asientosLibre, precio, listaDePasajeros = []) {
    this.id = id;
    this.nombreVuelo = nombreVuelo;
    this.origen = origen;
    this.destino = destino;
    this.fechaSalida = fechaSalida;
    this.duracion = duracion;
    this.asientosLibre = asientosLibre;
    this.precio = precio;
    this.listaDePasajeros = listaDePasajeros;
  }
}
