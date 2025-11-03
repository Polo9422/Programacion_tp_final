export class ModeloVuelos {
  constructor(id, nombreVuelo, origen, destino, fechaSalida, duracion, asientosLibre, precio, listaDePasajeros = []) {
    this.id = Number(id);
    this.nombreVuelo = nombreVuelo;
    this.origen = origen;
    this.destino = destino;
    this.fechaSalida = fechaSalida;
    this.asientosLibre = asientosLibre;
    this.precio = precio;
    this.listaDePasajeros = listaDePasajeros;
  }
}
