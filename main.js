import promptSync from "prompt-sync";
import { vuelosService } from "./services/vuelosService.js";
import {pasajerosService} from "./services/pasajerosService.js";

const servicio = new vuelosService();
const servicioPasajero = new pasajerosService();
const prompt = promptSync();
const menuVuelo = function (){
    let salir = false;
    console.clear();
        console.log("Elija una opcion");
        console.log(" 1 - Crear vuelo");
        console.log(" 2 - Modificar vuelo");
        console.log(" 3 - Borrar vuelo");
        console.log(" 4 - Listar vuelos");
        console.log(" 5 - Buscar vuelos por ID");
        console.log(" 0 - Volver");
        switch (prompt("Elija una opcion:")){
        case "1":
            servicio.registrarVuelo();
            break;
        case "2":
            servicio.modificarVuelo();
            break;
        case "3":
            servicio.borrarVuelo();
            break;
        case "4":
            servicio.listarVuelos();
          break;
        case "5":
            servicio.filtrarVuelos();
              prompt("Presione ENTER para continuar...");
            break;
        case "0":
            console.log("elgiste volver");
            salir = true;
            break;
        default:
            console.log("Ingrese una opción correcta.");
            break; 
        }
    return !salir;
    
}

const menuPasajero = function () {
    let salir = false;
    console.clear();
    console.log("Elija una opción");
    console.log(" 1 - Registrar pasajero a vuelo");
    console.log(" 2 - Modificar datos de pasajero");
    console.log(" 3 - Borrar pasajero");
    console.log(" 4 - Lista de pasajeros");
    console.log(" 5 - Filtrar pasajero");
    console.log(" 6 - Registrar pasajero a vuelo (base)");
    console.log(" 0 - Volver");

    switch (prompt("Elija una opción: ")) {
        case "1":
            console.clear();
            servicioPasajero.crearPasajero();
            break;

        case "2":
            console.clear();
            servicioPasajero.modificarPasajero(); 
            break;

        case "3":
            console.clear();
            servicioPasajero.borrarPasajero();
            break;

        case "4":
            console.clear();
            servicioPasajero.listarPasajero(); 
            break;

        case "5":
            console.clear();
            servicioPasajero.filtrarPasajero(); 
            break;

        case "6":
            console.clear();
            servicioPasajero.registrarPasajeroVuelo(); 
            break;

        case "0":
            console.clear();
            console.log("Elegiste volver");
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
};



const menu = function (){
    let salir = false;
    console.log("Elija una opcion");
    console.log(" 1 - Menu de vuelo");
    console.log(" 2 - Menu de pasajeros");
    console.log(" 0 - Salir del sistema");
    switch (prompt("Elija una opcion:")){
    case "1":
        console.clear();
        while(menuVuelo());
        break;
    case "2":
        console.clear();
        while(menuPasajero());
        break;
    case "0":
        console.clear();
        console.log("Elegiste salir");
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