import promptSync from "prompt-sync";
import { AerolineaService } from "./Aerolineas/aerolineaService.js";
import { ModeloAerolineas } from "./Aerolineas/modeloAerolineas.js";
const servicio = new AerolineaService();
//const PromptSync = require("prompt-sync");
const prompt = promptSync();
const menuVuelo = function (){
    let salir = false;
        console.clear();
        console.log("Elija una opcion");
        console.log(" 1 - Crear vuelo");
        console.log(" 2 - Modificar vuelo");
        console.log(" 3 - Borrar vuelo");
        console.log(" 4 - Listar vuelos");
        console.log(" 5 - Filtrar vuelos");
        console.log(" 6 - Registrar pasajero vuelo"); //?
        console.log(" 0 - Volver");
        switch (prompt("Elija una opcion:")){
        case "1":
            //crearVuelo();
            //crear la funcion "crearVueloPorPrompt()"
            console.clear();
            const id = servicio.vuelos.length + 1;
            const nombreVuelo = prompt("Nombre del vuelo: ");
            const origen = prompt("Origen: ");
            const destino = prompt("Destino: ");
            const fechaSalida = prompt("Fecha de salida (YYYY-MM-DD): ");
            const duracion = Number(prompt("Duración (horas): "));
            const asientosLibre = Number(prompt("Asientos disponibles: "));
            const precio = Number(prompt("Precio del vuelo: "));
            const vuelo = new ModeloAerolineas(id, nombreVuelo, origen, destino, fechaSalida, duracion, asientosLibre, precio);
            servicio.crearVuelo(vuelo);
            console.log("crearVuelo()");
            prompt("Presione ENTER para continuar...");
            break;
        case "2":
            console.clear();
            //modificarVuelo();
            console.log("modificarVuelo()");
            prompt("Presione ENTER para continuar...");
            break;
        case "3":
            console.clear();
            //borrar(vuelo)
            console.log("borrarVuelo()");
            prompt("Presione ENTER para continuar...");
            break;
        case "4":
            console.clear();
            //listarVuelos();



            servicio.listarVuelos();
            console.log("listarVuelos()");
            prompt("Presione ENTER para continuar...");
            break;
        case "5":
            console.clear();
            //filtrarVuelos();
            const idPasajeros = prompt("ID del vuelo: ");
            const vueloEncontrado = servicio.buscarVueloPorId(idPasajeros);
            if (vueloEncontrado) {
                console.table(vueloEncontrado.listaDePasajeros);
            } else {
                console.log("Vuelo no encontrado.");
            }
            console.log("filtrarVuelo()");
            prompt("Presione ENTER para continuar...");
            break;
        case "6":
            console.clear();
            //crear la funcion de registrarPasajeroVuelo();
            //registrarPasajeroVuelo();
            const idVuelo = prompt("ID del vuelo: ");
            const nombre = prompt("Nombre del pasajero: ");
            const dni = prompt("DNI: ");
            const pasajero = { nombre, dni };
            servicio.agregarPasajero(idVuelo, pasajero);
            console.log("registrarPasajeroVuelo()");
            prompt("Presione ENTER para continuar...");
            break;
        case "0":
            console.clear();
            console.log("elgiste volver");
            prompt("Presione ENTER para continuar...");
            salir = true;
            break;
        default:
            console.log("Ingrese una opción correcta.");
            prompt("Presione ENTER para continuar...");
            break; 
        
        }
    return !salir;
    
}

const menuPasajero = function (){
    let salir = false;

        console.clear();
        console.log("Elija una opcion");
        console.log(" 1 - Crear pasajero");
        console.log(" 2 - Modificar pasajero");
        console.log(" 3 - Borrar pasajero");
        console.log(" 4 - Listar pasajero");
        console.log(" 5 - Filtrar pasajero");
        console.log(" 6 - Registrar pasajero a Vuelo"); //?
        console.log(" 0 - Volver");
        switch (prompt("Elija una opcion:")){
        case "1":
            //crearPasajero();
            console.clear();
            console.log("crearPasajero()");
            prompt("Presione ENTER para continuar...");
            break;
        case "2":
            //modificarPasajero();
            console.clear();
            console.log("modificarPasajero()");
            prompt("Presione ENTER para continuar...");
            break;
        case "3":
            //borrarPasajero();
            console.clear();
            console.log("borrarPasajero()");
            prompt("Presione ENTER para continuar...");
            break;
        case "4":
            //listarPasajero();
            console.clear();
            console.log("listarPasajero()");
            prompt("Presione ENTER para continuar...");
            break;
        case "5":
            //filtrarPasajero();
            console.clear();
            console.log("filtrarPasajero()");
            prompt("Presione ENTER para continuar...");
            break;
        case "6":
            //registrarPasajeroVuelo();
            console.clear();
            console.log("registrarPasajeroVuelo()");
            prompt("Presione ENTER para continuar...");
            break;
        case "0":
            console.clear();
            console.log("elegiste volver");
            prompt("Presione ENTER para continuar...");
            salir = true;
            break;
        default:
            console.clear();
            console.log("Ingrese una opción correcta.");
            prompt("Presione ENTER para continuar...");
            break; 
        
        }

    return !salir;
}





const menu = function (){
    let salir = false;
    console.clear();
    console.log("Elija una opcion");
    console.log(" 1 - Menu de vuelo");
    console.log(" 2 - Menu de pasajeros");
    console.log(" 0 - Salir del sistema");
    switch (prompt("Elija una opcion:")){
    case "1":
        while(menuVuelo());
        break;
    case "2":
        while(menuPasajero());
        break;
    case "0":
        //console.log("Salir del sistema");
        console.log("elegiste salir");
        salir = true;
        break;
    default:
        console.log("Ingrese una opción correcta.");
        break; 
    }
    return !salir;
}
const main = function (){
    while (menu());
    return;
}

main();