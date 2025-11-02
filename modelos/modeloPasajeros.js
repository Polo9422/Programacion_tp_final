
export class modelPasajero {
  constructor(nombre, dni, telefono, direccion, email, genero, nacionalidad, fecha_de_nacimiento) {
    this.nombre = nombre;
    this.dni = Number(dni);
    this.edad = this.calcularEdad(fecha_de_nacimiento);
    this.telefono = telefono;
    this.direccion = direccion;
    this.email = email;
    this.genero = genero;
    this.nacionalidad = nacionalidad;
    this.fecha_de_nacimiento = fecha_de_nacimiento;
  }
}

export function calcularEdad(fecha_de_nacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fecha_de_nacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
}
