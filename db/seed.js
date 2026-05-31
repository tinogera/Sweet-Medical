// Script para poblar la base de datos con valores iniciales (Obviamente para desarrollo).
// Esto lo ejecuta docker-compose al iniciar el contenedor de mongo

// ===================================================
// 🧩 CREAR COLECCIONES
// ===================================================
db.createCollection('usuarios');

// ===================================================
// 🪴 INSERTAR DATOS DE EJEMPLO
// ===================================================
const nombres = [
  "parador_spallata", "resto_los_patos", "bar_el_rincon", "cafeteria_sol",
  "pizzeria_napoli", "sushi_kami", "taqueria_el_sol", "heladeria_cremi",
  "pub_cerveza", "bistro_frances", "trattoriaroma", "wok_express",
  "asado_gaucho", "marisqueria_el_mar", "veggie_garden", "dim_sum_palace",
  "taco_factory", "curry_house", "creperie_bretagne", "ramen Ichiban"
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const usuarios = nombres.map(nombre => {
  const numNotificaciones = randomInt(0, 20);
  const notificaciones = [];
  for (let i = 0; i < numNotificaciones; i++) {
    const enviado = randomDate(new Date("2025-01-01"), new Date("2026-05-30"));
    const visto = Math.random() < 0.5;
    notificaciones.push({
      id: i,
      destinatario: nombre,
      mensaje: "Notificacion #" + (i + 1) + " para " + nombre,
      fechaHoraEnviado: enviado,
      visto: visto,
      fechaHoraVisto: visto ? randomDate(enviado, new Date("2026-05-30")) : null
    });
  }
  return { nombre, notificaciones };
});

db.usuarios.insertMany(usuarios);
