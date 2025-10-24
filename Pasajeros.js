// datos de un pasajero para para ser ingresado con prompt sync desde el main 
// para ser guardado en un json
// ---------------------
// Clase Pasaporte
// ---------------------
// los puse con guion bajo para o por si lo usamos con algun json.
class Pasaporte {
  constructor(numero_pasaporte, fecha_de_vencimiento, pais_de_emision, pasajero) {
    this.numero_pasaporte = numero_pasaporte;
    this.fecha_de_vencimiento = fecha_de_vencimiento;
    this.pais_de_emision = pais_de_emision;
    this.pasajero = pasajero; // referencia opcional
  }
}

// ---------------------
// Clase Pasajero
// ---------------------
class Pasajero {
  constructor(
    nombre,
    apellido,
    dni,
    edad,
    telefono,
    direccion,
    email,
    genero,
    nacionalidad,
    fecha_de_nacimiento,
    pasaporte
  ) {
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
    this.pasaporte = pasaporte;
  }
}

// ---------------------
// Clase para modificar pasajero
// ---------------------
class ModificarPasajero {
  constructor({
    dni,
    nuevoNombre,
    nuevoApellido,
    nuevaEdad,
    nuevoTelefono,
    nuevaDireccion,
    nuevoEmail,
    nuevoGenero,
    nuevaNacionalidad,
    nuevaFechaDeNacimiento,
    nuevoPasaporte,
  }) {
    this.dni = dni;
    this.nuevoNombre = nuevoNombre;
    this.nuevoApellido = nuevoApellido;
    this.nuevaEdad = nuevaEdad;
    this.nuevoTelefono = nuevoTelefono;
    this.nuevaDireccion = nuevaDireccion;
    this.nuevoEmail = nuevoEmail;
    this.nuevoGenero = nuevoGenero;
    this.nuevaNacionalidad = nuevaNacionalidad;
    this.nuevaFechaDeNacimiento = nuevaFechaDeNacimiento;
    this.nuevoPasaporte = nuevoPasaporte;
  }
}

// ---------------------
// Clase para eliminar pasajero
// ---------------------
class EliminarPasajero {
  constructor(dni) {
    this.dni = dni;
  }
}

// ---------------------
// Exportaciones
// ---------------------
export { EliminarPasajero, ModificarPasajero, Pasajero, Pasaporte };
