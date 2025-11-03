import fs from "fs";
import path, { parse } from "path";
import promptSync from "prompt-sync";
import { ModeloVuelos } from "../modelos/modeloVuelos.js"; 


const prompt = promptSync();

export class vuelosService {
  constructor() {
    this.vuelos = [];
    this.ruta = path.resolve("./data/vuelos.json"); 
    this.cargarVuelos();
  }
registrarVuelo() {
  // Generar un ID único automáticamente
  const id = this.generarId();

  // Nombre del vuelo
  let nombreVuelo;
  while (true) {
    const input = prompt("Nombre del vuelo: ").trim();
    if (this.validarTexto(input, "Nombre del vuelo")) {
      nombreVuelo = input;
      break;
    }
  }

  // Origen
  let origen;
  while (true) {
    const input = prompt("Origen: ").trim();
    if (this.validarTexto(input, "Origen")) {
      origen = input;
      break;
    }
  }

  // Destino
  let destino;
  while (true) {
    const input = prompt("Destino: ").trim();
    if (this.validarTexto(input, "Destino")) {
      destino = input;
      break;
    }
  }

  // Fecha de salida
  let fechaSalida;
  while (true) {
    const input = prompt("Fecha de salida (YYYY-MM-DD): ").trim();
    if (this.validarFecha(input, "Fecha de salida")) {
      fechaSalida = input;
      break;
    }
  }

  // Asientos disponibles por defecto
  const asientosLibre = 300;

  // Precio
  let precio;
  while (true) {
    const input = prompt("Precio del vuelo: ").trim();
    const valor = this.validarNumero(input, "Precio");
    if (valor !== null) {
      precio = valor;
      break;
    }
  }

  // Crear el vuelo con lista de pasajeros vacía
  const nuevoVuelo = new ModeloVuelos(
    id,
    nombreVuelo,
    origen,
    destino,
    fechaSalida,
    asientosLibre,
    precio,
    [] // lista de pasajeros vacía al inicio
  );

  this.crearVuelo(nuevoVuelo);
  console.log("✅ Vuelo creado correctamente.");
}

  // 🔹 Leer los vuelos desde el JSON
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

  // 🔹 Guardar los vuelos actualizados en el JSON
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
  console.clear();
  const id = Number(prompt("Ingrese el ID del vuelo que desea modificar: "));
  const vuelo = this.buscarVueloPorId(id);

  if (!vuelo) {
    console.log("❌ Vuelo no encontrado.");
    return;
  }

  console.log(`✈️ Modificando vuelo: ${vuelo.nombreVuelo}`);
  console.log("Deje vacío un campo si no desea cambiarlo.");

  // Nombre
  let nuevoNombre;
  while (true) {
    const input = prompt(`Nuevo nombre (${vuelo.nombreVuelo}): `).trim();
    if (input === "") {
      nuevoNombre = vuelo.nombreVuelo;
      break;
    } else if (this.validarTexto(input, "Nombre del vuelo")) {
      nuevoNombre = input;
      break;
    }
  }

  // Origen
  let nuevoOrigen;
  while (true) {
    const input = prompt(`Nuevo origen (${vuelo.origen}): `).trim();
    if (input === "") {
      nuevoOrigen = vuelo.origen;
      break;
    } else if (this.validarTexto(input, "Origen")) {
      nuevoOrigen = input;
      break;
    }
  }

  // Destino
  let nuevoDestino;
  while (true) {
    const input = prompt(`Nuevo destino (${vuelo.destino}): `).trim();
    if (input === "") {
      nuevoDestino = vuelo.destino;
      break;
    } else if (this.validarTexto(input, "Destino")) {
      nuevoDestino = input;
      break;
    }
  }

  // Fecha
  let nuevaFecha;
  while (true) {
    const input = prompt(`Nueva fecha (${vuelo.fechaSalida}): `).trim();
    if (input === "") {
      nuevaFecha = vuelo.fechaSalida;
      break;
    } else if (this.validarFecha(input, "Fecha de salida")) {
      nuevaFecha = input;
      break;
    }
  }

  // Duración
  let nuevaDuracion;
  while (true) {
    const input = prompt(`Nueva duración (${vuelo.duracion}): `).trim();
    if (input === "") {
      nuevaDuracion = vuelo.duracion;
      break;
    } else {
      const valor = this.validarNumero(input, "Duración");
      if (valor !== null) {
        nuevaDuracion = valor;
        break;
      }
    }
      prompt("Presione ENTER para continuar...");
  }

  // Asientos disponibles
  let nuevosAsientos;
  while (true) {
    const input = prompt(`Nuevos asientos disponibles (${vuelo.asientosLibre}): `).trim();
    if (input === "") {
      nuevosAsientos = vuelo.asientosLibre;
      break;
    } else {
      const valor = this.validarNumero(input, "Asientos disponibles");
      if (valor !== null) {
        nuevosAsientos = valor;
        break;
      }
    }
  }

  // Precio
  let nuevoPrecio;
  while (true) {
    const input = prompt(`Nuevo precio (${vuelo.precio}): `).trim();
    if (input === "") {
      nuevoPrecio = vuelo.precio;
      break;
    } else {
      const valor = this.validarNumero(input, "Precio");
      if (valor !== null) {
        nuevoPrecio = valor;
        break;
      }
    }
  }

  // Guardar cambios
  vuelo.nombreVuelo = nuevoNombre;
  vuelo.origen = nuevoOrigen;
  vuelo.destino = nuevoDestino;
  vuelo.fechaSalida = nuevaFecha;
  vuelo.duracion = nuevaDuracion;
  vuelo.asientosLibre = nuevosAsientos;
  vuelo.precio = nuevoPrecio;

  this.guardarVuelos();
  console.log("✅ Vuelo modificado correctamente.");
}

// CASE 3 Borrar un vuelo existente
borrarVuelo() {
  const id = Number(prompt("Ingrese el ID del vuelo que desea borrar: "));
  const vuelo = this.buscarVueloPorId(id);

  if (!vuelo) {
    console.log("Vuelo NO encontrado.");
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

// CASE 5 Filtrar vuelos por ID
filtrarVuelos() {
  const idVuelo = prompt("ID del vuelo: ");
  const vueloEncontrado = this.buscarVueloPorId(idVuelo);

  if (!vueloEncontrado) {
    console.log("❌ Vuelo no encontrado.");
    return null;
  }

  // Mostrar datos del vuelo
  console.log("=== Vuelo encontrado ===");
  console.log(`ID: ${vueloEncontrado.id}`);
  console.log(`Nombre: ${vueloEncontrado.nombreVuelo}`);
  console.log(`Origen: ${vueloEncontrado.origen}`);
  console.log(`Destino: ${vueloEncontrado.destino}`);
  console.log(`Fecha de salida: ${vueloEncontrado.fechaSalida}`);
  console.log(`Duración: ${vueloEncontrado.duracion} h`);
  console.log(`Asientos libres: ${vueloEncontrado.asientosLibre}`);
  console.log(`Precio: $${vueloEncontrado.precio}`);

  // Mostrar pasajeros solo si existen
  if (vueloEncontrado.listaDePasajeros.length > 0) {
    console.log("Lista de pasajeros:");
    console.table(vueloEncontrado.listaDePasajeros);
  } else {
    console.log("Pasajeros: Ninguno");
  }

  return vueloEncontrado;
}


  // 🔹 Buscar vuelo por ID
  buscarVueloPorId(id) {
    return this.vuelos.find(v => v.id == id);
  }
  // 🔹 Generar ID único
  generarId() {
    const ids = this.vuelos.map(v => v.id);
    let nuevoId = 1;
    while (ids.includes(nuevoId)) {
      nuevoId++;
    }
    return nuevoId;
  }
// Valida que solo haya letras y espacios
validarTexto(input, campo) {
  const regex = /^[A-Za-z\s]+$/;
  if (!regex.test(input) || input.trim() === "") {
    console.log(`❌ "${campo}" debe contener solo letras y no estar vacío.`);
    return false;
  }
  return true;
}

// Valida fecha en formato YYYY-MM-DD y que no haya pasado
validarFecha(input, campo) {
  const fecha = new Date(input);
  const hoy = new Date();
  if (isNaN(fecha.getTime())) {
    console.log(`❌ "${campo}" inválida. Use formato YYYY-MM-DD.`);
    return false;
  } else if (fecha < hoy) {
    console.log(`❌ "${campo}" no puede ser anterior a hoy.`);
    return false;
  }
  return true;
}

// Valida que sea un número positivo
validarNumero(input, campo) {
  const valor = Number(input);
  if (isNaN(valor) || valor <= 0) {
    console.log(`❌ "${campo}" debe ser un número mayor a 0.`);
    return null;
  }
  return valor;
}
}