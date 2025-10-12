import { modeloAerolinea } from './modeloAerolineas.js';

export class AerolineaService {
  constructor() {
    this.aerolineas = [];
  }

  crearAerolineaAleatoria(id) {
    const aerolineas = ["Aerolíneas Argentinas", "Iberia", "LATAM", "Air France", "Emirates", "American Airlines"];
    const destinos = ["Buenos Aires", "Madrid", "Miami", "Roma", "Londres", "Tokio", "París", "Santiago de Chile"];

    const nombre = aerolineas[Math.floor(Math.random() * aerolineas.length)];
    const destino = destinos[Math.floor(Math.random() * destinos.length)];
    const vuelo = `${nombre.slice(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000 + 1000)}`;
    const fecha = `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`;
    const salida = `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`;
    const tiempoVuelo = `${Math.floor(Math.random() * 10) + 2}h ${Math.floor(Math.random() * 60)}m`;

    // Usamos la clase importada del modelo
    return new modeloAerolinea(id, vuelo, fecha, destino, salida, tiempoVuelo, nombre);
  }

  generarAerolineas(cantidad) {
    this.aerolineas = [];
    for (let i = 1; i <= cantidad; i++) {
      const nueva = this.crearAerolineaAleatoria(i);
      this.aerolineas.push(nueva);
    }
    return this.aerolineas;
  }

  listar() {
    console.table(this.aerolineas);
  }
}

const servicio = new AerolineaService();
servicio.generarAerolineas(100);
servicio.listar();