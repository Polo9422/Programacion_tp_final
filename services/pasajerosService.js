import fs from "fs";
import path from "path";
import promptSync from "prompt-sync";
import { modelPasajero/*, calcularEdad*/} from "../modelos/modeloPasajeros.js";
import { vuelosService } from "../services/vuelosService.js";


const prompt = promptSync();


export class pasajerosService {
  constructor() {
    this.pasajeros = [];
    this.ruta = path.resolve("./Data/pasajeros.json");
    this.cargarPasajeros();

    }
// Función para crear un pasajero
cargarPasajeros() {
    if (fs.existsSync(this.ruta)) {
      const contenido = fs.readFileSync(this.ruta, "utf-8");
      this.pasajeros = JSON.parse(contenido);
      //console.log(` ${this.pasajeros.length} pasajeros cargados.`);
    } else {
      console.log(" No se encontró el archivo pasajeros.json. Se inicia vacío.");
      this.pasajeros = [];
    }
  }
crearPasajero() {
    console.clear();
    console.log("=== Crear Pasajero ===");

    const nombre = prompt("Nombre: ");
    const apellido = prompt("Apellido: ");
    const dni = parseInt(prompt("DNI: "));
    const edad = parseInt(prompt("Edad: "));
    const telefono = prompt("Teléfono: ");
    const direccion = prompt("Dirección: ");
    const email = prompt("Email: ");
    const genero = prompt("Género: ");
    const nacionalidad = prompt("Nacionalidad: ");
    const fecha_nacimiento = prompt("Fecha de nacimiento (dd/mm/aaaa): ");
    const historialDeVuelos = [];

    const nuevoPasajero = new modelPasajero(
        nombre,
        apellido,
        dni,
        edad,
        telefono,
        direccion,
        email,
        genero,
        nacionalidad,
        fecha_nacimiento,

        );

    this.pasajeros.push(nuevoPasajero);
    console.log("\n✅ Pasajero creado correctamente.");

    // Preguntar si quiere generar un pasaporte
    //const generarPasaporte = prompt("¿Desea generar pasaporte para este pasajero? (s/n): ").toLowerCase();
    /*if (generarPasaporte === "s") {
        const numero = prompt("Número de pasaporte: ");
        const vencimiento = prompt("Fecha de vencimiento: ");
        const pais = prompt("País de emisión: ");

        const nuevoPasaporte = new Pasaporte(numero, vencimiento, pais, nuevoPasajero);
        pasaportes.push(nuevoPasaporte);
        nuevoPasajero.pasaporte = nuevoPasaporte.numero_pasaporte;
        console.log("🛂 Pasaporte creado y asignado al pasajero.");
        }*/

    }
guardarPasajeros() {
    fs.writeFileSync(this.ruta, JSON.stringify(this.pasajeros, null, 2), "utf-8");
  }
//CASE 2Función para modificar un pasajero


modificarPasajero() {
    console.clear();
    console.log("=== Modificar Pasajero ===");
    const dni = parseInt(prompt("Ingrese el DNI del pasajero a modificar: "));
    const pasajero = this.pasajeros.find((p) => p.dni === dni);

    if (!pasajero) {
            console.log("Pasajero NO encontrado.");
            return prompt("Presione ENTER para continuar...");
        }

    pasajero.nombre = prompt(`Nombre (${pasajero.nombre}): `) || pasajero.nombre;
    pasajero.apellido = prompt(`Apellido (${pasajero.apellido}): `) || pasajero.apellido;
    pasajero.edad = parseInt(prompt(`Edad (${pasajero.edad}): `)) || pasajero.edad;
    pasajero.telefono = prompt(`Teléfono (${pasajero.telefono}): `) || pasajero.telefono;
    pasajero.direccion = prompt(`Dirección (${pasajero.direccion}): `) || pasajero.direccion;
    pasajero.email = prompt(`Email (${pasajero.email}): `) || pasajero.email;
    pasajero.genero = prompt(`Género (${pasajero.genero}): `) || pasajero.genero;
    pasajero.nacionalidad = prompt(`Nacionalidad (${pasajero.nacionalidad}): `) || pasajero.nacionalidad;

    this.guardarPasajeros();
    console.log("\n Pasajero modificado con éxito.");
    }


// Función para borrar un pasajero

borrarPasajero() {
    console.clear();
    console.log("=== Borrar Pasajero ===");
    const dni = parseInt(prompt("Ingrese el DNI del pasajero a eliminar: "));
    const index = pasajeros.findIndex((p) => p.dni === dni);
// if index es -1 significa que no se encontró el pasajero. 
    if (index === -1) {
        console.log("❌ Pasajero no encontrado.");
    } else {
        const pasajero = pasajeros[index];
        const confirmar = prompt(
            `⚠️ El pasajero ${pasajero.nombre} ${pasajero.apellido} será eliminado. ¿Está seguro? (s/n): `
        ).toLowerCase();

        if (confirmar === "s") {
            // eliminar pasajero
            pasajeros.splice(index, 1);
            console.log(`✅ El pasajero ${pasajero.nombre} ${pasajero.apellido} fue eliminado correctamente.`);
        } else {
            console.log(`❎ Operación cancelada. El pasajero ${pasajero.nombre} ${pasajero.apellido} no fue eliminado.`);
        }
    }
     prompt("Presione ENTER para continuar...");

}



// Listar todos los pasajeros

listarPasajero() {
    console.clear();
    console.log("=== Lista de Pasajeros ===");

    if (this.pasajeros.length === 0) {
        console.log("No hay pasajeros registrados.");
    } else {
        this.pasajeros.forEach((p, i) => {
            console.log(
                `#${i + 1} | ${p.nombre} ${p.apellido} | DNI: ${p.dni} | Edad: ${p.edad} | Nacionalidad: ${p.nacionalidad}`
            );
        });
    }

}


// Filtrar pasajeros por criterio

filtrarPasajero() {
    console.clear();
    console.log("=== Buscar Pasajeros  por DNI ===");
    //const criterio = prompt("Ingrese nombre, apellido, nacionalidad o DNI: ").toLowerCase();
    const dniPasajero = prompt("DNI del pasajero: ");
    const pasajeroEncontrado = this.buscarPasajeroPorId(dniPasajero);
   if (pasajeroEncontrado) {
 //   console.table(vueloEncontrado); // o console.log(vueloEncontrado)/////ESTO NO ESTABA ANTES
  console.log(`ID: ${pasajeroEncontrado.id} | ${pasajeroEncontrado.nombre} | ${pasajeroEncontrado.apellido} | ${pasajeroEncontrado.dni}`);
            // Esto imprime la información complementaria del vuelo: Fecha de salida, duración, asientos libres y precio.
            console.log(`Nombre: ${pasajeroEncontrado.nombre} | Apellido: ${pasajeroEncontrado.apellido} | DNI: ${pasajeroEncontrado.dni}`);
            // si la lista de pasajeros está vacía o no existe, muestra "Ninguno". Si hay pasajeros, los lista uno por uno
            if (!pasajeroEncontrado.historialDeVuelos || pasajeroEncontrado.historialDeVuelos.length === 0) {
                console.log("Pasajeros: Ninguno\n");
              
            } else {
              // Si hay pasajeros, los lista uno por uno
                pasajeroEncontrado.historialDeVuelos.forEach((p, i) => {
                    console.log(`  ${i + 1}. ${p.nombre || "Sin nombre"} ${p.apellido || "Sin apellido"} | DNI: ${p.dni || "Sin DNI"}`);
                });
                console.log(""); // línea en blanco entre vuelos
            }
    return pasajeroEncontrado;         // <-- devuelve el pasajero completo
  } else {
    console.log("Pasajero no encontrado.");
    return null;
  }



 }
filtrarPasajeroPorNombre(){
    console.clear();
    console.log("=== Buscar Pasajeros ===");
    const criterio = prompt("Ingrese nombre o nacionalidad: ").toLowerCase();
    const filtrados = this.pasajeros.filter(
        (p) =>
        p.nombre.toLowerCase().includes(criterio) ||
        //p.apellido.toLowerCase().includes(criterio) ||
        p.nacionalidad.toLowerCase().includes(criterio)
        ///p.dni.toLowerCase().includes(criterio)//.includes(Number(criterio))
        );

    if (filtrados.length === 0) {
        console.log("No se encontraron pasajeros que coincidan con ese criterio.");
    } else {
        filtrados.forEach((p) => {
        console.log(
        `${p.nombre} ${p.apellido} | DNI: ${p.dni} | Edad: ${p.edad} | Nacionalidad: ${p.nacionalidad} | Pasaporte: ${p.pasaporte || "No asignado"}`
        );
        });
    }
}
// Registrar pasajero a un vuelo (base)

registrarPasajeroVuelo() {
  console.clear();
  console.log("=== Registrar Pasajero a un Vuelo ===");

  const vueloSrv = new vuelosService(); // crear instancia del servicio de vuelos

  const dni = parseInt(prompt("Ingrese el DNI del pasajero: "));
  const pasajero = this.pasajeros.find(p => p.dni === dni);

  if (!pasajero) {
    console.log("❌ Pasajero no encontrado.");
    return;
  }

  const idVuelo = parseInt(prompt("Ingrese el ID del vuelo: "));
  const vuelo = vueloSrv.buscarVueloPorId(idVuelo);

  if (!vuelo) {
    console.log("❌ Vuelo no encontrado.");
    return ;
  }

  if (vuelo.asientosLibre <= 0) {
    console.log("⚠️ No hay asientos disponibles en este vuelo.");
    return ;
  }

  // Agregar pasajero (solo nombre y apellido)
  vuelo.listaDePasajeros.push({
    nombre: pasajero.nombre,
    apellido: pasajero.apellido,
    dni: pasajero.dni
  });

  // Reducir asientos
  vuelo.asientosLibre--;

  // Agregar el vuelo al historial del pasajero
  pasajero.historialDeVuelos.push({
    idVuelo: vuelo.id,
    nombreVuelo: vuelo.nombreVuelo,
    destino: vuelo.destino
  });

  // Guardar los cambios en ambos JSON
  vueloSrv.guardarVuelos();
  this.guardarPasajeros();

  console.log(`✅ ${pasajero.nombre} ${pasajero.apellido} agregado al vuelo ${vuelo.nombreVuelo}.`);
}

buscarPasajeroPorId(id) {
  const idNum = parseInt(id);
  return this.pasajeros.find(pasajero => pasajero.dni == idNum);
}

mostrarHistorialDeVuelos() {
  console.clear();
  console.log("=== Historial de vuelos de un pasajero ===");

  const dni = parseInt(prompt("Ingrese el DNI del pasajero: "));
  const pasajero = this.pasajeros.find(p => p.dni === dni);

  if (!pasajero) {
    console.log("❌ No se encontró ningún pasajero con ese DNI.");
    return prompt("Presione ENTER para continuar...");
  }

  if (!Array.isArray(pasajero.historialDeVuelos) || pasajero.historialDeVuelos.length === 0) {
    console.log(`⚠️ El pasajero ${pasajero.nombre} no tiene vuelos registrados.`);
    return prompt("Presione ENTER para continuar...");
  }

  console.log(`\n🧳 Historial de vuelos de ${pasajero.nombre}:`);
  pasajero.historialDeVuelos.forEach((vuelo, index) => {
    console.log(`\n✈️ Vuelo #${index + 1}`);
    console.log(`🆔 ID de vuelo: ${vuelo.idVuelo}`);
    console.log(`📍 Destino: ${vuelo.destino}`);
    console.log(`🪪 Nombre del vuelo: ${vuelo.nombreVuelo}`);
  });
}


}