import fs from "fs";
import path from "path";
import { ModeloAerolineas } from "./modeloAerolineas.js";

export class AerolineaService {
  constructor() {
    this.vuelos = [];
    this.cargarVuelos();
  }

  cargarVuelos() {
    const ruta = path.resolve("./vuelos.json");
    const contenido = fs.readFileSync(ruta, "utf-8");
    this.vuelos = JSON.parse(contenido);
    console.log(`✅ ${this.vuelos.length} vuelos cargados.`);
  }

  listarVuelos() {
    console.table(this.vuelos.map(v => ({
      id: v.id,
      nombreVuelo: v.nombreVuelo,
      origen: v.origen,
      destino: v.destino,
      precio: v.precio,
      asientosLibre: v.asientosLibre
    })));
  }

  crearVuelo(vuelo) {
    this.vuelos.push(vuelo);
    console.log(`✈️ Vuelo ${vuelo.nombreVuelo} agregado con éxito.`);
  }

  buscarVueloPorId(id) {
    return this.vuelos.find(v => v.id == id);
  }

  agregarPasajero(id, pasajero) {
    const vuelo = this.buscarVueloPorId(id);
    if (!vuelo) return console.log("❌ Vuelo no encontrado.");

    vuelo.listaDePasajeros.push(pasajero);
    vuelo.asientosLibre--;

    console.log(`🧍‍♂️ Pasajero ${pasajero.nombre} agregado al vuelo ${vuelo.nombreVuelo}.`);
  }
}
