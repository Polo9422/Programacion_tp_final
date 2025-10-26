import fs from "fs";
import path from "path";
import promptSync from "prompt-sync";
import { ModeloAerolineas } from "./modeloAerolineas.js"; 

const prompt = promptSync();

export class AerolineaService {
  constructor() {
    this.vuelos = [];
    this.ruta = path.resolve("./Data/vuelos.json"); // Ruta al archivo JSON
    this.cargarVuelos();
  }
  registrarVuelo() {
    const id = this.vuelos.length + 1;
    const nombreVuelo = prompt("Nombre del vuelo: ");
    const origen = prompt("Origen: ");
    const destino = prompt("Destino: ");
    const fechaSalida = prompt("Fecha de salida (YYYY-MM-DD): ");
    const duracion = Number(prompt("Duración (horas): "));
    const asientosLibre = Number(prompt("Asientos disponibles: "));
    const precio = Number(prompt("Precio del vuelo: "));
    const newvuelo = new ModeloAerolineas(id, nombreVuelo, origen, destino, fechaSalida, duracion, asientosLibre, precio, []);

    this.crearVuelo(newvuelo); // ✅ guarda también en el JSON
    console.log("✅ Vuelo creado correctamente.");
    prompt("Presione ENTER para continuar...");
  }
  // 🔹 Leer los vuelos desde el JSON
  cargarVuelos() {
    if (fs.existsSync(this.ruta)) {
      const contenido = fs.readFileSync(this.ruta, "utf-8");
      this.vuelos = JSON.parse(contenido);
      console.log(` ${this.vuelos.length} vuelos cargados.`);
    } else {
      console.log(" No se encontró el archivo vuelos.json. Se inicia vacío.");
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
    this.guardarVuelos(); // guarda los cambios
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
    this.guardarVuelos(); // guarda el JSON actualizado

    console.log(`🧍‍♂️ Pasajero ${pasajero.nombre} agregado al vuelo ${vuelo.nombreVuelo}.`);
  }

  // CASE 2 Modificar un vuelo existente
modificarVuelo() {
  console.clear();
  const id = Number(prompt("Ingrese el ID del vuelo que desea modificar: "));
  const vuelo = this.buscarVueloPorId(id);

  if (!vuelo) {
    console.log("❌ Vuelo no encontrado.");
    prompt("Presione ENTER para continuar...");
    return;
  }

  console.log(`✈️ Modificando vuelo: ${vuelo.nombreVuelo}`);
  console.log("Deje vacío un campo si no desea cambiarlo.");

  const nuevoNombre = prompt(`Nuevo nombre (${vuelo.nombreVuelo}): `) || vuelo.nombreVuelo;
  const nuevoOrigen = prompt(`Nuevo origen (${vuelo.origen}): `) || vuelo.origen;
  const nuevoDestino = prompt(`Nuevo destino (${vuelo.destino}): `) || vuelo.destino;
  const nuevaFecha = prompt(`Nueva fecha (${vuelo.fechaSalida}): `) || vuelo.fechaSalida;
  const nuevaDuracion = prompt(`Nueva duración (${vuelo.duracion}): `) || vuelo.duracion;
  const nuevosAsientos = prompt(`Nuevos asientos disponibles (${vuelo.asientosLibre}): `) || vuelo.asientosLibre;
  const nuevoPrecio = prompt(`Nuevo precio (${vuelo.precio}): `) || vuelo.precio;

  vuelo.nombreVuelo = nuevoNombre;
  vuelo.origen = nuevoOrigen;
  vuelo.destino = nuevoDestino;
  vuelo.fechaSalida = nuevaFecha;
  vuelo.duracion = Number(nuevaDuracion);
  vuelo.asientosLibre = Number(nuevosAsientos);
  vuelo.precio = Number(nuevoPrecio);

  this.guardarVuelos();
  console.log("Vuelo modificado correctamente.");
}

// CASE 3 Borrar un vuelo existente
borrarVuelo() {
  console.clear();
  const id = Number(prompt("Ingrese el ID del vuelo que desea borrar: "));
  const vuelo = this.buscarVueloPorId(id);

  if (!vuelo) {
    console.log("Vuelo NO encontrado.");
    prompt("Presione ENTER para continuar...");
    return;
  }

  console.log(`Está a punto de borrar el vuelo: ${vuelo.nombreVuelo}`);
  const confirmacion = prompt("¿Confirma que desea borrarlo? (s/n): ").toLowerCase();

  if (confirmacion === "s") {
    this.vuelos = this.vuelos.filter(v => v.id !== id);
    this.guardarVuelos();
    console.log("Vuelo borrado correctamente.");
  } else {
    console.log("Operación cancelada.");
  }

}

// CASE 6 Filtrar vuelos por ID
filtrarVuelos(){
    const idPasajeros = prompt("ID del vuelo: ");
    const vueloEncontrado = this.buscarVueloPorId(idPasajeros);
    if (vueloEncontrado) {
        console.table(vueloEncontrado.listaDePasajeros);
    } else {
  console.log("Vuelo no encontrado.");
  }
}
}
