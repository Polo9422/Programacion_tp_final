import fs from "fs";
import path, { parse } from "path";
import promptSync from "prompt-sync";
import { ModeloAerolineas } from "../modelos/modeloVuelos.js"; 

const prompt = promptSync();

export class vuelosService {
  constructor() {
    this.vuelos = [];
    this.ruta = path.resolve("./data/vuelos.json"); 
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

    this.crearVuelo(newvuelo); // guarda también en el JSON
    console.log("✅ Vuelo creado correctamente.");
    prompt("Presione ENTER para continuar...");
  }
  // Leer los vuelos desde el JSON
  cargarVuelos() {
    if (fs.existsSync(this.ruta)) {
      const contenido = fs.readFileSync(this.ruta, "utf-8");
      this.vuelos = JSON.parse(contenido);
      //console.log(` ${this.vuelos.length} vuelos cargados.`);
    } else {
      console.log(" No se encontró el archivo vuelos.json. Se inicia vacío.");
      this.vuelos = [];
    }
  }

  // Guardar los vuelos actualizados en el JSON
  guardarVuelos() {
    fs.writeFileSync(this.ruta, JSON.stringify(this.vuelos, null, 2), "utf-8");
  }

  // CASE 1 Listar todos los vuelos. 

listarVuelos() {
    console.log("=== Lista de Vuelos ===");

    if (!this.vuelos || this.vuelos.length === 0) { 
        console.log("No hay vuelos disponibles.");
    } else {
        this.vuelos.forEach(vuelo => {
          // Esto imprime la información principal de ese vuelo en una sola línea.
            console.log(`ID: ${vuelo.id} | ${vuelo.nombreVuelo} | ${vuelo.origen} -> ${vuelo.destino}`);
            // Esto imprime la información complementaria del vuelo: Fecha de salida, duración, asientos libres y precio.
            console.log(`Fecha: ${vuelo.fechaSalida} | Duración: ${vuelo.duracion}h | Asientos: ${vuelo.asientosLibre} | Precio: $${vuelo.precio}`);
            // si la lista de pasajeros está vacía o no existe, muestra "Ninguno". Si hay pasajeros, los lista uno por uno
            if (!vuelo.listaDePasajeros || vuelo.listaDePasajeros.length === 0) {
                console.log("Pasajeros: Ninguno\n");
              
            } else {
              // Si hay pasajeros, los lista uno por uno
                vuelo.listaDePasajeros.forEach((p, i) => {
                    console.log(`  ${i + 1}. ${p.nombre || "Sin nombre"} ${p.apellido || "Sin apellido"} | DNI: ${p.dni || "Sin DNI"}`);
                });
                console.log(""); // línea en blanco entre vuelos
            }
        });
    }
}


  // Crear vuelo nuevo y guardar cambios
  crearVuelo(vuelo) {
    this.vuelos.push(vuelo);
    this.guardarVuelos(); 
    console.log(`✈️ Vuelo ${vuelo.nombreVuelo} agregado con éxito.`);
  }

  // 🔹 Agregar pasajero y guardar cambios
  agregarPasajero(id, pasajero) {
    const vuelo = this.buscarVueloPorId(id);
    if (!vuelo) return console.log("❌ Vuelo no encontrado.");

    vuelo.listaDePasajeros.push(pasajero);
    vuelo.asientosLibre--;
    this.guardarVuelos(); 

    console.log(`🧍‍♂️ Pasajero ${pasajero.nombre} agregado al vuelo ${vuelo.nombreVuelo}.`);
  }

  // CASE 2 Modificar un vuelo existente
modificarVuelo() {

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

filtrarVuelos() {
  const idPasajeros = prompt("ID del vuelo: ");
  const vueloEncontrado = this.buscarVueloPorId(idPasajeros);

  if (vueloEncontrado) {
    console.table(vueloEncontrado); // o console.log(vueloEncontrado)
    return vueloEncontrado;         // <-- devuelve el vuelo completo
  } else {
    console.log("Vuelo no encontrado.");
    return null;
  }
}
  // Buscar vuelo por ID
buscarVueloPorId(id) {
  const idNum = parseInt(id);
  return this.vuelos.find(vuelo => vuelo.id === idNum);
}
}
