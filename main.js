import promptSync from "prompt-sync";
import { AerolineaService } from "./services/vuelosService.js";
import {pasajeroService} from "./services/pasajerosService.js";
//import { ModeloAerolineas } from "./modeloAerolineas.js";

const servicio = new AerolineaService();
const servicioPasajero = new pasajeroService();
const prompt = promptSync();
const menuVuelo = function (){
    let salir = false;
    console.clear();
        console.log("Elija una opcion");
        console.log(" 1 - Crear vuelo");
        console.log(" 2 - Modificar vuelo");
        console.log(" 3 - Borrar vuelo");
        console.log(" 4 - Listar vuelos");
        console.log(" 5 - Filtrar vuelos por ID");
        console.log(" 0 - Volver");
        switch (prompt("Elija una opcion:")){
        case "1":
        console.clear();
            servicio.registrarVuelo();
            prompt("Presione ENTER para continuar...");
            break;

        case "2":
            console.clear();
            servicio.modificarVuelo();
            prompt("Presione ENTER para continuar...");
            break;
        case "3":
            console.clear();
            servicio.borrarVuelo();
            prompt("Presione ENTER para continuar...");
            break;
        case "4":
          console.clear();
          servicio.listarVuelos();
          prompt("Presione ENTER para continuar...");
          break;
        case "5":
        console.clear();
        filtrarVueloPorId();
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
            prompt("Presione ENTER para continuar...");
            break;

        case "2":
            console.clear();
            servicioPasajero.modificarPasajero(); 
            prompt("Presione ENTER para continuar...");
            break;

        case "3":
            console.clear();
            servicioPasajero.borrarPasajero();
            prompt("Presione ENTER para continuar...");
            break;

        case "4":
            console.clear();
            servicioPasajero.listarPasajero(); 
            prompt("Presione ENTER para continuar...");
            break;

        case "5":
            console.clear();
            servicioPasajero.filtrarPasajero(); 
            prompt("Presione ENTER para continuar...");
            break;

        case "6":
            console.clear();
            servicioPasajero.registrarPasajeroVuelo(); 
            prompt("Presione ENTER para continuar...");
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