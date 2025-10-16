import { modeloAerolinea } from './modeloAerolineas.js';

export class AerolineaService {

  constructor() {
    this.aerolineas = [];
    this.historialVuelos = {}; // historial por id de pasajero
  }

  // Generar aerolínea aleatoria
  crearAerolineaAleatoria(id) {
    const aerolineas = ["Aerolíneas Argentinas", "Iberia", "LATAM", "Air France", "Emirates", "American Airlines"];
    const destinos = ["Buenos Aires", "Madrid", "Miami", "Roma", "Londres", "Tokio", "París", "Santiago de Chile"];
    const origenes = ["Córdoba", "Mendoza", "Rosario", "Buenos Aires", "Montevideo", "Asunción"];

    const nombre = aerolineas[Math.floor(Math.random() * aerolineas.length)];
    const destino = destinos[Math.floor(Math.random() * destinos.length)];
    const origen = origenes[Math.floor(Math.random() * origenes.length)];

    const vuelo = `${nombre.slice(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000 + 1000)}`;

    // Fecha aleatoria entre 31/10/2025 y 31/12/2025
    const fechaInicio = new Date("2025-10-31");
    const fechaFin = new Date("2025-12-31");
    const diferencia = fechaFin.getTime() - fechaInicio.getTime();
    const fechaAleatoria = new Date(fechaInicio.getTime() + Math.random() * diferencia);
    const fecha = fechaAleatoria.toISOString().split("T")[0];

    // Hora y tiempo de vuelo
    const hora = `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`;
    const tiempoVuelo = `${Math.floor(Math.random() * 10) + 2}h ${Math.floor(Math.random() * 60)}m`;

    // Determinar salida según la hora
    const horaNum = parseInt(hora.split(":")[0]);
    let salida;
    if (horaNum < 6) salida = "Noche";
    else if (horaNum < 12) salida = "Mañana";
    else if (horaNum < 18) salida = "Tarde";
    else salida = "Atardecer";

    // Precio aleatorio
    const precio = (Math.random() * 1200 + 200).toFixed(2);

    // Crear instancia del modelo
    return new modeloAerolinea(id, vuelo, fecha, destino, hora, tiempoVuelo, nombre, origen, precio, salida);
  }


  // Generar varios vuelos
  generarAerolineas(cantidad) {
    this.aerolineas = [];
    for (let i = 1; i <= cantidad; i++) {
      const nueva = this.crearAerolineaAleatoria(i);
      pusheador(nueva,this.aerolineas);
    }
    return this.aerolineas;
  }

  // Listar todos los vuelos
  listar() {
    console.table(this.aerolineas);
  }

  // Registrar vuelo en historial por pasajero
  registrarVuelo(idPasajero, vuelo) {
    if (!this.historialVuelos[idPasajero]) {
      this.historialVuelos[idPasajero] = [];
    }
    this.historialVuelos[idPasajero].push(vuelo);
  }

  // Mostrar historial de un pasajero
  mostrarHistorial(idPasajero) {
    const historial = this.historialVuelos[idPasajero];
    if (!historial || historial.length === 0) {
      console.log(`El pasajero ${idPasajero} no tiene vuelos registrados.`);
    } else {
      console.log(`✈️ Historial de vuelos del pasajero ${idPasajero}:`);
      console.table(historial);
    }
  }
}
function pusheador(elemento, lista){
    lista.push(elemento)
   }

// ========== Ejecución directa ==========
const servicio = new AerolineaService();
const vuelos = servicio.generarAerolineas(10);

// Asignar vuelos a 3 pasajeros (uno sin vuelos)
servicio.registrarVuelo(1, vuelos[0]);
servicio.registrarVuelo(1, vuelos[1]);
servicio.registrarVuelo(2, vuelos[2]);
servicio.registrarVuelo(2, vuelos[3]);
servicio.registrarVuelo(3, vuelos[4]);

// Mostrar resultados
console.log("🛫 Lista completa de vuelos:");
servicio.listar();

console.log("\n📋 Historial de vuelos:");
servicio.mostrarHistorial(1);
servicio.mostrarHistorial(2);
servicio.mostrarHistorial(3);
servicio.mostrarHistorial(4); // sin vuelos
