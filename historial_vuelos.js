// simulacion de vuelos
const servicioVuelos = {
  vuelos: [
    {
      numero: "AR101",
      origen: "Buenos Aires",
      destino: "Madrid",
      capacidad: 2,
      pasajeros: ["Lucas", "Gonzalo"]
    },
    {
      numero: "AR202",
      origen: "Córdoba",
      destino: "Bariloche",
      capacidad: 3,
      pasajeros: ["Sanchez"]
    },
    {
      numero: "AR303",
      origen: "Mendoza",
      destino: "Santiago de Chile",
      capacidad: 1,
      pasajeros: []
    }
  ]
};

// Te muestra el historial del fucking vuelo o los vuelos
function mostrarHistorialDeVuelos(servicio) {
  console.log("=== HISTORIAL DE VUELOS ===");

  if (!servicio.vuelos || servicio.vuelos.length === 0) {
    console.log("No hay vuelos registrados todavía.");
    return;
  }

  for (let vuelo of servicio.vuelos) {
    console.log(`\nNúmero de vuelo: ${vuelo.numero}`);
    console.log(`Origen: ${vuelo.origen}`);
    console.log(`Destino: ${vuelo.destino}`);
    console.log(`Capacidad: ${vuelo.capacidad}`);
    console.log(`Pasajeros: ${vuelo.pasajeros.length > 0 ? vuelo.pasajeros.join(", ") : "Sin pasajeros"}`);
  }

  console.log("\n=== Fin del historial ===");
}

// --- Pruebamos ---
mostrarHistorialDeVuelos(servicioVuelos);