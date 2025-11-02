// Esta clase es una plantilla para cada pasajero
class modelPasajero {
  // Estas son las propiedades inicializadas en el constructor.
  constructor(nombre, apellido, dni, edad, telefono, direccion, email, genero, nacionalidad, fecha_de_nacimiento, pasaporte) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.edad = edad;
    this.telefono = telefono;
    this.direccion = direccion;
    this.email = email;
    this.genero = genero;
    this.nacionalidad = nacionalidad;
    this.fecha_de_nacimiento = fecha_de_nacimiento;
    this.pasaporte = pasaporte; // Se inicializa para completarla luego.
  }
}

// Lo mismo, define la plantilla del pasaporte
class Pasaporte {
  constructor(numero_pasaporte, fecha_de_vencimiento, pais_de_emision, pasajero) {
    this.numero_pasaporte = numero_pasaporte;
    this.fecha_de_vencimiento = fecha_de_vencimiento;
    this.pais_de_emision = pais_de_emision;
    this.pasajero = pasajero; // referencia al pasajero
  }
}

// --- PASAJEROS ---
// Exporta un arreglo llamado pasajeros con 10 instancias de modelPasajero
export const pasajeros = [
  new modelPasajero("Juan", "González", 35892145, 32, "+54 9 1123456789", "Av. Siempre Viva 742", "juan.gonzalez@gmail.com", "Masculino", "Argentina", "12/05/1993"),
  new modelPasajero("María", "Pérez", 42987564, 28, "+54 9 1132569874", "San Martín 456", "maria.perez@gmail.com", "Femenino", "Argentina", "23/08/1997"),
  new modelPasajero("Pedro", "López", 37789456, 40, "+54 9 1145872369", "Calle Falsa 123", "pedro.lopez@gmail.com", "Masculino", "Uruguaya", "10/11/1985"),
  new modelPasajero("Lucía", "Rodríguez", 40234567, 34, "+54 9 1152347896", "Belgrano 789", "lucia.rodriguez@gmail.com", "Femenino", "Chilena", "04/03/1991"),
  new modelPasajero("Carlos", "Fernández", 33123567, 50, "+54 9 1123987456", "Rivadavia 1010", "carlos.fernandez@gmail.com", "Masculino", "Argentina", "19/09/1975"),
  new modelPasajero("Ana", "Gómez", 45234567, 26, "+54 9 1134782569", "Av. Siempre Viva 742", "ana.gomez@gmail.com", "Femenino", "Paraguaya", "15/06/1999"),
  new modelPasajero("Diego", "Romero", 36895214, 37, "+54 9 1145692378", "San Martín 456", "diego.romero@gmail.com", "Masculino", "Boliviana", "28/01/1988"),
  new modelPasajero("Valentina", "Martínez", 41987523, 30, "+54 9 1159823745", "Calle Falsa 123", "valentina.martinez@gmail.com", "Femenino", "Argentina", "02/12/1994"),
  new modelPasajero("Sofía", "Díaz", 38562345, 42, "+54 9 1123458796", "Belgrano 789", "sofia.diaz@gmail.com", "Femenino", "Peruana", "21/07/1983"),
  new modelPasajero("Martín", "Torres", 35698245, 33, "+54 9 1135698745", "Rivadavia 1010", "martin.torres@gmail.com", "Masculino", "Chilena", "06/04/1992")
];

// --- PASAPORTES (cada uno asociado a su pasajero) ---
// looooo mesmooo que pasajeros un simple array con sus respectivos ID :)
export const pasaportes = [
  new Pasaporte("A4567821", "15/09/2032", "Argentina", pasajeros[0]),
  new Pasaporte("B9845123", "22/03/2031", "Argentina", pasajeros[1]),
  new Pasaporte("C6752390", "11/11/2030", "Uruguay", pasajeros[2]),
  new Pasaporte("D1239045", "03/07/2033", "Chile", pasajeros[3]),
  new Pasaporte("E7834592", "25/01/2034", "Argentina", pasajeros[4]),
  new Pasaporte("F3457820", "14/05/2031", "Paraguay", pasajeros[5]),
  new Pasaporte("G9283715", "19/10/2032", "Bolivia", pasajeros[6]),
  new Pasaporte("H6782351", "09/08/2030", "Argentina", pasajeros[7]),
  new Pasaporte("J9837462", "17/12/2033", "Perú", pasajeros[8]),
  new Pasaporte("K7483920", "06/02/2034", "Chile", pasajeros[9])
];

// asignamos el pasaporte dentro del pasajero

for (let i = 0; i < pasajeros.length; i++) {
  pasajeros[i].pasaporte = pasaportes[i].numero_pasaporte;
}
