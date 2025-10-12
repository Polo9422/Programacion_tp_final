
// pasajeros

class Passenger {
  constructor(id, nombre, apellido, dni) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
  }
}

class PassengerService {
  constructor() {
    this.pasajeros = [];
  }

  // Agregar pasajero
  addPassenger(nombre, apellido, dni) {
    const nuevoPasajero = new Passenger(
      this.pasajeros.length + 1,
      nombre,
      apellido,
      dni
    );
    this.pasajeros.push(nuevoPasajero);
    return nuevoPasajero;
  }

  // Listar todos los pasajeros
  getAllPassengers() {
    return this.pasajeros;
  }

  // Buscar al pasajero por DNI
  findByDni(dni) {
    return this.pasajeros.find((p) => p.dni === dni);
  }
}

// Ejemplo de uso:
const pasajeros = new PassengerService();

// Agregar pasajeros
pasajeros.addPassenger("Juan", "Polo", "12345678");
pasajeros.addPassenger("Nahuel", "Charlone", "87654321");
pasajeros.addPassenger("Christian", "Sanchez", "11223344");

// Mostrar todos los pasajeros
console.log("Lista de pasajeros:");
console.log(pasajeros.getAllPassengers());
