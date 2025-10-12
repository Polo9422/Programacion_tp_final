// Función para obtener el historial completo de vuelos
export function mostrarHistorialDeVuelos(servicioVuelos) {
  if (!servicioVuelos || !Array.isArray(servicioVuelos.vuelos)) {
    console.log("No hay información de vuelos disponible.");
    return [];
  }

  if (servicioVuelos.vuelos.length === 0) {
    console.log("No hay vuelos registrados aún.");
    return [];
  }

  const historial = servicioVuelos.vuelos.map(vuelo => {
    const cantidadPasajeros = Array.isArray(vuelo.pasajeros) ? vuelo.pasajeros.length : 0;

    return {
      numeroVuelo: vuelo.numeroVuelo,
      origen: vuelo.origen,
      destino: vuelo.destino,
      capacidad: vuelo.capacidad,
      pasajerosRegistrados: cantidadPasajeros,
      listaPasajeros: cantidadPasajeros > 0 
        ? vuelo.pasajeros.map(p => `${p.nombre} ${p.apellido} (DNI: ${p.dni})`)
        : ["Sin pasajeros registrados"]
    };
  });

  // Mostrar el historial de forma legible por consola
  console.log("\n===== HISTORIAL DE VUELOS =====");
  historial.forEach((vuelo, i) => {
    console.log(`\nVuelo ${i + 1}: ${vuelo.numeroVuelo}`);
    console.log(`Origen: ${vuelo.origen}`);
    console.log(`Destino: ${vuelo.destino}`);
    console.log(`Capacidad: ${vuelo.capacidad}`);
    console.log(`Pasajeros registrados: ${vuelo.pasajerosRegistrados}`);
    console.log("Lista de pasajeros:");
    vuelo.listaPasajeros.forEach(p => console.log(" - " + p));
  });

  return historial;
}
mostrarHistorialDeVuelos(servicioVuelos);