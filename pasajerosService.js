import promptSync from "prompt-sync";
import { modelPasajero, Pasaporte,} from "./modeloPasajeros.js";
import { pasajeros, pasaportes } from "./Data/Pasajeros.js";
const prompt = promptSync();


export class pasajeroService {
  constructor() {
    this.pasajeros = pasajeros;
    this.pasaportes = pasaportes;
    }
// Función para crear un pasajero

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
        null
        );

    pasajeros.push(nuevoPasajero);
    console.log("\n✅ Pasajero creado correctamente.");

    // Preguntar si quiere generar un pasaporte
    const generarPasaporte = prompt("¿Desea generar pasaporte para este pasajero? (s/n): ").toLowerCase();
    if (generarPasaporte === "s") {
        const numero = prompt("Número de pasaporte: ");
        const vencimiento = prompt("Fecha de vencimiento: ");
        const pais = prompt("País de emisión: ");

        const nuevoPasaporte = new Pasaporte(numero, vencimiento, pais, nuevoPasajero);
        pasaportes.push(nuevoPasaporte);
        nuevoPasajero.pasaporte = nuevoPasaporte.numero_pasaporte;
        console.log("🛂 Pasaporte creado y asignado al pasajero.");
        }

        }

//CASE 2Función para modificar un pasajero

modificarPasajero() {
    console.clear();
    console.log("=== Modificar Pasajero ===");
    const dni = parseInt(prompt("Ingrese el DNI del pasajero a modificar: "));
    const pasajero = pasajeros.find((p) => p.dni === dni);

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

    console.log("\n Pasajero modificado con éxito.");
    prompt("Presione ENTER para continuar...");
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

    if (pasajeros.length === 0) {
        console.log("No hay pasajeros registrados.");
    } else {
        pasajeros.forEach((p, i) => {
            console.log(
                `#${i + 1} | ${p.nombre} ${p.apellido} | DNI: ${p.dni} | Edad: ${p.edad} | Nacionalidad: ${p.nacionalidad} | Pasaporte: ${p.pasaporte || "No asignado"}`
            );
        });
    }

    prompt("Presione ENTER para continuar..."); // ← agregá esta línea
}


// Filtrar pasajeros por criterio

filtrarPasajero() {
    console.clear();
    console.log("=== Filtrar Pasajeros ===");
    const criterio = prompt("Ingrese nombre, apellido o nacionalidad: ").toLowerCase();
    const filtrados = pasajeros.filter(
        (p) =>
        p.nombre.toLowerCase().includes(criterio) ||
        p.apellido.toLowerCase().includes(criterio) ||
        p.nacionalidad.toLowerCase().includes(criterio)
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
    console.log("=== Registrar Pasajero a Vuelo ===");

    const dni = parseInt(prompt("Ingrese el DNI del pasajero: "));
    const pasajero = pasajeros.find((p) => p.dni === dni);

    if (!pasajero) {
        console.log(" Pasajero no encontrado.");
        return prompt("Presione ENTER para continuar...");
    }

    // Por ahora es un placeholder
    console.log(`✈️ Registrando pasajero ${pasajero.nombre} ${pasajero.apellido} a un vuelo...`);
    console.log("(Integración con módulo de vuelos pendiente)");

    prompt("Presione ENTER para continuar...");
    }
}