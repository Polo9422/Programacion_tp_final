import fs from "fs";
import path from "path";
import { ModeloAerolineas } from "./modeloAerolineas.js";

export class AerolineaService {
  constructor() {
    this.vuelos = [];
    this.ruta = path.resolve("./vuelos.json"); // ✅ guardamos la ruta una sola vez
    this.cargarVuelos();
  }

  // 🔹 Leer los vuelos desde el JSON
  cargarVuelos() {
    if (fs.existsSync(this.ruta)) {
      const contenido = fs.readFileSync(this.ruta, "utf-8");
      this.vuelos = JSON.parse(contenido);
      console.log(`✅ ${this.vuelos.length} vuelos cargados.`);
    } else {
      console.log("⚠️ No se encontró el archivo vuelos.json. Se inicia vacío.");
      this.vuelos = [];
    }
  }

  // 🔹 Guardar los vuelos actualizados en el JSON
  guardarVuelos() {
    fs.writeFileSync(this.ruta, JSON.stringify(this.vuelos, null, 2), "utf-8");
  }

  // 🔹 Listar vuelos (solo algunos campos)
  listarVuelos() {
    console.table(
      this.vuelos.map((v) => ({
        id: v.id,
        nombreVuelo: v.nombreVuelo,
        origen: v.origen,
        destino: v.destino,
        precio: v.precio,
        asientosLibre: v.asientosLibre,
      }))
    );
  }

  // 🔹 Crear vuelo nuevo y guardar cambios
  crearVuelo(vuelo) {
    this.vuelos.push(vuelo);
    this.guardarVuelos(); // ✅ guarda los cambios
    console.log(`✈️ Vuelo ${vuelo.nombreVuelo} agregado con éxito.`);
  }

  // 🔹 Buscar vuelo por ID
  buscarVueloPorId(id) {
    return this.vuelos.find((v) => v.id == id);
  }

  // 🔹 Agregar pasajero y guardar cambios
  agregarPasajero(id, pasajero) {
    const vuelo = this.buscarVueloPorId(id);
    if (!vuelo) return console.log("❌ Vuelo no encontrado.");

    vuelo.listaDePasajeros.push(pasajero);
    vuelo.asientosLibre--;
    this.guardarVuelos(); // ✅ guarda el JSON actualizado

    console.log(`🧍‍♂️ Pasajero ${pasajero.nombre} agregado al vuelo ${vuelo.nombreVuelo}.`);
  }
}
