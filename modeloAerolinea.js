import fs from 'fs';
// modeloAerolinea.js

import { crearAerolinea } from './crearAerolinea.js';

// Podés usar esta función para generar datos aleatorios si querés
function generarDatosAleatorios(id) {
  const aerolineas = ["Aerolíneas Argentinas", "Iberia", "LATAM", "Air France", "Emirates", "American Airlines"];
  const destinos = ["Buenos Aires", "Madrid", "Miami", "Roma", "Londres", "Tokio", "París", "Santiago de Chile"];

  const nombre = aerolineas[Math.floor(Math.random() * aerolineas.length)];
  const destino = destinos[Math.floor(Math.random() * destinos.length)];
  const vuelo = `${nombre.slice(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000 + 1000)}`;
  const fecha = `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`;
  const salida = `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`;
  const tiempoVuelo = `${Math.floor(Math.random() * 10) + 2}h ${Math.floor(Math.random() * 60)}m`;

  return crearAerolinea(id, vuelo, fecha, destino, salida, tiempoVuelo, nombre);
}

// Creamos una lista con 5 aerolíneas
const listaAerolineas = [];

for (let i = 1; i <= 5; i++) {
  listaAerolineas.push(generarDatosAleatorios(i));
}

// Mostramos el resultado
console.log(listaAerolineas);
