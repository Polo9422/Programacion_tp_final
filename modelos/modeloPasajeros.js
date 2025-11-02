
export class modelPasajero {
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
    this.pasaporte = pasaporte;
  }
}


export class Pasaporte {
  constructor(numero_pasaporte, fecha_de_vencimiento, pais_de_emision, pasajero) {
    this.numero_pasaporte = numero_pasaporte;
    this.fecha_de_vencimiento = fecha_de_vencimiento;
    this.pais_de_emision = pais_de_emision;
    this.pasajero = pasajero;
  }
}
