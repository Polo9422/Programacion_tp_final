const PromptSync = require("prompt-sync");
const prompt = PromptSync();
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
        console.log("crearVuelo()");
        break;
    case "2":
        //modificarVuelo();
        console.log("modificarVuelo()");
        break;
    case "3":
        //borrar(vuelo)
        console.log("borrarVuelo()");
        break;
    case "4":
        //listarVuelos();
        console.log("listarVuelos()");
        break;
    case "5":
        //filtrarVuelos();
        console.log("filtrarVuelo()");
        break;
    case "6":
        //registrarPasajeroVuelo();
        console.log("registrarPasajeroVuelo()");
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
        console.log("crearPasajero()");
        break;
    case "2":
        //modificarPasajero();
        console.log("modificarPasajero()");
        break;
    case "3":
        //borrarPasajero();
        console.log("borrarPasajero()");
        break;
    case "4":
        //listarPasajero();
        console.log("listarPasajero()");
        break;
    case "5":
        //filtrarPasajero();
        console.log("filtrarPasajero()");
        break;
    case "6":
        //registrarPasajeroVuelo();
        console.log("registrarPasajeroVuelo()");
        break;
    case "0":
        console.log("elegiste volver");
        salir = true;
        break;
    default:
        console.log("Ingrese una opción correcta.");
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
    return !salir;
    }
    
}
const main = function (){
    while (menu());
    return;
}

main();