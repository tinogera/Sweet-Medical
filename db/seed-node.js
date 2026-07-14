import mongoose from 'mongoose';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

// Helper para entrada interactiva por consola si no hay variables de entorno
const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => rl.question(query, (ans) => {
    rl.close();
    resolve(ans.trim());
  }));
};

async function run() {
  let dbConnectionString = process.env.DB_CONNECTION_STRING;
  let dbName = process.env.MONGODB_DB_NAME || 'sweetmedical';

  console.log('🌱 Inicializando script de seeding para Sweet Medical...\n');

  if (!dbConnectionString) {
    console.log('No se detectó la variable de entorno DB_CONNECTION_STRING.');
    console.log('Por favor, introduce la cadena de conexión de MongoDB (por ejemplo, la de MongoDB Atlas):');
    dbConnectionString = await askQuestion('> ');
    
    if (!dbConnectionString) {
      console.error('❌ Error: Se requiere una cadena de conexión para continuar.');
      process.exit(1);
    }

    const customDbName = await askQuestion('Introduce el nombre de la base de datos (por defecto: sweetmedical):\n> ');
    if (customDbName) {
      dbName = customDbName;
    }
  }

  // Formatear la cadena de conexión de manera robusta
  let cleanedConnectionString = dbConnectionString.trim();
  let [baseUrl, queryParams] = cleanedConnectionString.split('?');

  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }

  const protocolMatch = baseUrl.match(/^(mongodb(?:\+srv)?:\/\/)(.*)$/);
  if (protocolMatch) {
    const protocol = protocolMatch[1];
    const remaining = protocolMatch[2];
    const slashIndex = remaining.indexOf('/');
    if (slashIndex !== -1) {
      const hostPart = remaining.substring(0, slashIndex);
      baseUrl = `${protocol}${hostPart}/${dbName}`;
    } else {
      baseUrl = `${protocol}${remaining}/${dbName}`;
    }
  } else {
    baseUrl = `${baseUrl}/${dbName}`;
  }

  const url = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;

  console.log(`\n🔌 Conectando a la base de datos en: ${url.replace(/:([^:@]+)@/, ':****@')}...`);

  try {
    await mongoose.connect(url);
    console.log('✅ Conexión establecida con éxito.');
  } catch (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    process.exit(1);
  }

  const db = mongoose.connection.db;

  try {
    // ===================================================
    // 🗑️ LIMPIAR DATOS EXISTENTES
    // ===================================================
    console.log('\n🧹 Limpiando colecciones existentes para evitar duplicados...');
    const collectionsToClean = ['usuarios', 'servicios', 'sedes', 'medicos', 'pacientes', 'turnos'];
    
    for (const colName of collectionsToClean) {
      const collections = await db.listCollections({ name: colName }).toArray();
      if (collections.length > 0) {
        await db.collection(colName).deleteMany({});
        console.log(`   - Colección '${colName}' vaciada.`);
      } else {
        await db.createCollection(colName);
        console.log(`   - Colección '${colName}' creada.`);
      }
    }

    // ===================================================
    // 🛠️ HELPERS
    // ===================================================
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function randomPick(arr) {
      return arr[randomInt(0, arr.length - 1)];
    }

    function fechaISO(ano, mes, dia, hora, min) {
      return new Date(ano, mes - 1, dia, hora || 0, min || 0);
    }

    // ===================================================
    // 🏥 SERVICIOS (12)
    // ===================================================
    const svcIds = [];
    for (let i = 0; i < 12; i++) svcIds.push(new mongoose.Types.ObjectId());

    const serviciosData = [
      { _id: svcIds[0],  tipoServicio: "ESPECIALIDAD", nombre: "Cardiología",    descripcion: "Atención cardiológica general",                 precio: 2500, duracion: 30 },
      { _id: svcIds[1],  tipoServicio: "ESPECIALIDAD", nombre: "Dermatología",   descripcion: "Consulta dermatológica",                        precio: 2000, duracion: 20 },
      { _id: svcIds[2],  tipoServicio: "ESPECIALIDAD", nombre: "Neurología",     descripcion: "Evaluación neurológica completa",               precio: 3000, duracion: 45 },
      { _id: svcIds[3],  tipoServicio: "ESPECIALIDAD", nombre: "Pediatría",      descripcion: "Atención pediátrica integral",                  precio: 1800, duracion: 25 },
      { _id: svcIds[4],  tipoServicio: "ESPECIALIDAD", nombre: "Traumatología",  descripcion: "Consulta por lesiones óseas y articulares",     precio: 2200, duracion: 30 },
      { _id: svcIds[5],  tipoServicio: "ESPECIALIDAD", nombre: "Oftalmología",   descripcion: "Examen de agudeza visual y fondo de ojo",       precio: 2300, duracion: 25 },
      { _id: svcIds[6],  tipoServicio: "ESPECIALIDAD", nombre: "Ginecología",    descripcion: "Control ginecológico de rutina",                precio: 2100, duracion: 30 },
      { _id: svcIds[7],  tipoServicio: "ESPECIALIDAD", nombre: "Clínica Médica", descripcion: "Consulta de medicina general",                  precio: 1700, duracion: 20 },
      { _id: svcIds[8],  tipoServicio: "PRACTICA",     nombre: "Radiografía",    descripcion: "Estudio radiográfico simple",                   precio: 1500, duracion: 15 },
      { _id: svcIds[9],  tipoServicio: "PRACTICA",     nombre: "Análisis de Sangre", descripcion: "Extracción y análisis de laboratorio",       precio: 800,  duracion: 10 },
      { _id: svcIds[10], tipoServicio: "PRACTICA",     nombre: "Ecografía",      descripcion: "Estudio ecográfico general",                    precio: 2000, duracion: 30 },
      { _id: svcIds[11], tipoServicio: "PRACTICA",     nombre: "Electrocardiograma", descripcion: "Registro de actividad eléctrica cardíaca",   precio: 1800, duracion: 20 },
    ];

    await db.collection('servicios').insertMany(serviciosData);
    console.log(`\n✅ Insertados ${serviciosData.length} servicios`);

    // ===================================================
    // 🏢 SEDES (4)
    // ===================================================
    const sedeIds = [];
    for (let i = 0; i < 4; i++) sedeIds.push(new mongoose.Types.ObjectId());

    const sedesData = [
      { _id: sedeIds[0], nombre: "Sede Central - Palermo",  ubicacion: { latitud: "-34.5887", longitud: "-58.4306" } },
      { _id: sedeIds[1], nombre: "Sede Norte - Belgrano",   ubicacion: { latitud: "-34.5622", longitud: "-58.4583" } },
      { _id: sedeIds[2], nombre: "Sede Sur - Caballito",    ubicacion: { latitud: "-34.6172", longitud: "-58.4363" } },
      { _id: sedeIds[3], nombre: "Sede Oeste - Flores",     ubicacion: { latitud: "-34.6375", longitud: "-58.4747" } },
    ];

    await db.collection('sedes').insertMany(sedesData);
    console.log(`✅ Insertadas ${sedesData.length} sedes`);

    // ===================================================
    // 👤 USUARIOS (28)
    // ===================================================
    const nombresUsuario = [
      "dr_garcia", "dra_lopez", "dr_martinez", "dra_rodriguez",
      "dr_fernandez", "dra_gonzalez", "dr_perez", "dra_sanchez",
      "pac_alvarez", "pac_benitez", "pac_caceres", "pac_dominguez",
      "pac_estevez", "pac_fuentes", "pac_gimenez", "pac_herrera",
      "parador_spallata", "resto_los_patos", "bar_el_rincon", "cafeteria_sol",
      "pizzeria_napoli", "sushi_kami", "taqueria_el_sol", "heladeria_cremi",
      "pub_cerveza", "bistro_frances", "trattoriaroma", "wok_express",
    ];

    const usuarioIds = [];
    const usuariosData = nombresUsuario.map(nombre => {
      const id = new mongoose.Types.ObjectId();
      usuarioIds.push(id);
      const numNotificaciones = randomInt(0, 20);
      const notificaciones = [];
      for (let i = 0; i < numNotificaciones; i++) {
        const enviado = randomDate(fechaISO(2025, 1, 1), fechaISO(2026, 5, 30));
        const visto = Math.random() < 0.5;
        notificaciones.push({
          id: i,
          destinatario: nombre,
          mensaje: `Notificación #${i + 1} para ${nombre}`,
          fechaHoraEnviado: enviado,
          visto: visto,
          fechaHoraVisto: visto ? randomDate(enviado, fechaISO(2026, 5, 30)) : null
        });
      }
      return { _id: id, nombre, notificaciones };
    });

    await db.collection('usuarios').insertMany(usuariosData);
    console.log(`✅ Insertados ${usuariosData.length} usuarios`);

    // ===================================================
    // 👨‍⚕️ MÉDICOS (8)
    // ===================================================
    const medicoIds = [];
    for (let i = 0; i < 8; i++) medicoIds.push(new mongoose.Types.ObjectId());

    const medicosConfig = [
      { nombre: "Carlos",   apellido: "García",    documento: "DNI-11111111", svcIdx: [0, 7],       sedeIdx: [0, 1] },
      { nombre: "María",    apellido: "López",     documento: "DNI-22222222", svcIdx: [1, 5],       sedeIdx: [0] },
      { nombre: "Jorge",    apellido: "Martínez",  documento: "DNI-33333333", svcIdx: [2, 10],      sedeIdx: [1, 2] },
      { nombre: "Ana",      apellido: "Rodríguez", documento: "DNI-44444444", svcIdx: [3, 8],       sedeIdx: [2] },
      { nombre: "Roberto",  apellido: "Fernández", documento: "DNI-55555555", svcIdx: [4, 9],       sedeIdx: [0, 3] },
      { nombre: "Laura",    apellido: "González",  documento: "DNI-66666666", svcIdx: [5, 6, 11],   sedeIdx: [1, 3] },
      { nombre: "Miguel",   apellido: "Pérez",     documento: "DNI-77777777", svcIdx: [0, 2, 11],   sedeIdx: [3] },
      { nombre: "Sofía",    apellido: "Sánchez",   documento: "DNI-88888888", svcIdx: [7, 9],       sedeIdx: [0, 1, 2] },
    ];

    function generarAgenda(fechaBase, sedesDelMedico) {
      const agenda = [];
      let hora = 8;
      for (let i = 0; i < 10 && hora < 16; i++) {
        const duracionMin = randomPick([15, 20, 25, 30, 45]);
        const inicio = fechaISO(fechaBase.getFullYear(), fechaBase.getMonth() + 1, fechaBase.getDate(), hora, 0);
        hora += Math.ceil(duracionMin / 60);
        if (hora > 16) break;
        const fin = fechaISO(fechaBase.getFullYear(), fechaBase.getMonth() + 1, fechaBase.getDate(), hora, 0);
        agenda.push({
          sede: randomPick(sedesDelMedico),
          horaInicio: inicio,
          horaFin: fin,
        });
      }
      return agenda;
    }

    const fechaBase = fechaISO(2026, 6, 2);

    const medicosData = medicosConfig.map((m, i) => ({
      _id: medicoIds[i],
      usuario: usuarioIds[i],
      nombre: m.nombre,
      apellido: m.apellido,
      documento: m.documento,
      servicios: m.svcIdx.map(ix => svcIds[ix]),
      sedes: m.sedeIdx.map(ix => sedeIds[ix]),
      agenda: generarAgenda(fechaBase, m.sedeIdx.map(ix => sedeIds[ix])),
    }));

    await db.collection('medicos').insertMany(medicosData);
    console.log(`✅ Insertados ${medicosData.length} médicos`);

    // ===================================================
    // 🧑‍⚕️ PACIENTES (8)
    // ===================================================
    const pacienteIds = [];
    for (let i = 0; i < 8; i++) pacienteIds.push(new mongoose.Types.ObjectId());

    const pacienteConfig = [
      { nombre: "Pedro",   apellido: "Alvarez",   documento: "PAC-11111111", os: "OSDE",           plan: "410",      cobertura: [0,1,2,3,4,5,6,7,8,10] },
      { nombre: "Juana",   apellido: "Benítez",   documento: "PAC-22222222", os: "Swiss Medical",  plan: "SMG-40",   cobertura: [0,1,2,3,4,7,8,11] },
      { nombre: "Luis",    apellido: "Cáceres",   documento: "PAC-33333333", os: "Galeno",         plan: "Oro",      cobertura: [0,1,2,3,4,5,6,7,8,9,10,11] },
      { nombre: "Marta",   apellido: "Domínguez", documento: "PAC-44444444", os: "Medicus",        plan: "Plan B",   cobertura: [0,1,2,3,4,5,7,8,10] },
      { nombre: "Raúl",    apellido: "Estévez",   documento: "PAC-55555555", os: "Particular",     plan: "Sin plan", cobertura: [] },
      { nombre: "Carmen",  apellido: "Fuentes",   documento: "PAC-66666666", os: "OSDE",           plan: "310",      cobertura: [0,1,2,3,4,7,8] },
      { nombre: "Diego",   apellido: "Giménez",   documento: "PAC-77777777", os: "Swiss Medical",  plan: "SMG-20",   cobertura: [0,1,7] },
      { nombre: "Elena",   apellido: "Herrera",   documento: "PAC-88888888", os: "Medicus",        plan: "Plan A",   cobertura: [0,1,7] },
    ];

    const pacientesData = pacienteConfig.map((p, i) => ({
      _id: pacienteIds[i],
      nombre: p.nombre,
      apellido: p.apellido,
      documento: p.documento,
      obraSocial: { nombre: p.os },
      plan: {
        tipo: p.plan,
        coberturaPorServicio: p.cobertura.map(svcIdx => ({
          servicio: svcIds[svcIdx],
          porcentaje: randomPick([50, 60, 70, 80, 100]),
        })),
      },
      usuarioId: usuarioIds[8 + i],
    }));

    await db.collection('pacientes').insertMany(pacientesData);
    console.log(`✅ Insertados ${pacientesData.length} pacientes`);

    // ===================================================
    // 📅 TURNOS
    // ===================================================
    function crearEstadoTurno(estado, fecha, motivo) {
      return {
        estado: estado,
        fechaHora: fecha,
        motivo: motivo || "",
      };
    }

    // Turnos DISPONIBLE
    const turnosDisponibles = [];
    for (let d = 1; d <= 5; d++) {
      const fechaTurno = fechaISO(2026, 6, 2 + d, randomInt(8, 15), 0);
      const medIdx = randomInt(0, medicosConfig.length - 1);
      const medConfig = medicosConfig[medIdx];
      const sedeIdx = randomPick(medConfig.sedeIdx);
      turnosDisponibles.push({
        fechaHora: fechaTurno,
        medico: medicoIds[medIdx],
        sede: sedeIds[sedeIdx],
        estadosTurno: [crearEstadoTurno("DISPONIBLE", fechaISO(2026, 5, 28), "Turno generado")],
      });
    }

    // Turnos RESERVADO
    const turnosReservados = [];
    for (let i = 0; i < 4; i++) {
      const medIdx = randomInt(0, medicosConfig.length - 1);
      const medConfig = medicosConfig[medIdx];
      const sedeIdx = randomPick(medConfig.sedeIdx);
      const svcIdx = randomPick(medConfig.svcIdx);
      turnosReservados.push({
        fechaHora: fechaISO(2026, 6, 3 + i, randomInt(9, 14), randomPick([0, 30])),
        medico: medicoIds[medIdx],
        paciente: pacienteIds[i],
        sede: sedeIds[sedeIdx],
        servicio: svcIds[svcIdx],
        estadosTurno: [
          crearEstadoTurno("DISPONIBLE", fechaISO(2026, 6, 1), "Generado automáticamente"),
          crearEstadoTurno("RESERVADO",  fechaISO(2026, 6, 1, 10, 30), "Reservado por el paciente"),
        ],
      });
    }

    // Turnos CONFIRMADO
    const turnosConfirmados = [];
    for (let i = 0; i < 3; i++) {
      const medIdx = randomInt(0, medicosConfig.length - 1);
      const medConfig = medicosConfig[medIdx];
      const sedeIdx = randomPick(medConfig.sedeIdx);
      const svcIdx = randomPick(medConfig.svcIdx);
      turnosConfirmados.push({
        fechaHora: fechaISO(2026, 6, 5 + i, randomInt(8, 16), randomPick([0, 30])),
        medico: medicoIds[medIdx],
        paciente: pacienteIds[4 + i],
        sede: sedeIds[sedeIdx],
        servicio: svcIds[svcIdx],
        estadosTurno: [
          crearEstadoTurno("DISPONIBLE",  fechaISO(2026, 6, 1), "Generado automáticamente"),
          crearEstadoTurno("RESERVADO",   fechaISO(2026, 6, 1, 14, 0), "Reservado por el paciente"),
          crearEstadoTurno("CONFIRMADO",  fechaISO(2026, 6, 2, 9, 0), "Confirmado por administración"),
        ],
      });
    }

    // Turnos REALIZADO (histórico)
    const turnosRealizados = [];
    for (let i = 0; i < 5; i++) {
      const medIdx = randomInt(0, medicosConfig.length - 1);
      const medConfig = medicosConfig[medIdx];
      const sedeIdx = randomPick(medConfig.sedeIdx);
      const svcIdx = randomPick(medConfig.svcIdx);
      const fechaRealizado = randomDate(fechaISO(2026, 5, 1), fechaISO(2026, 5, 30));
      turnosRealizados.push({
        fechaHora: fechaRealizado,
        medico: medicoIds[medIdx],
        paciente: randomPick(pacienteIds),
        sede: sedeIds[sedeIdx],
        servicio: svcIds[svcIdx],
        estadosTurno: [
          crearEstadoTurno("DISPONIBLE",  new Date(fechaRealizado.getTime() - 7 * 86400000), "Generado automáticamente"),
          crearEstadoTurno("RESERVADO",   new Date(fechaRealizado.getTime() - 5 * 86400000), "Reservado por el paciente"),
          crearEstadoTurno("CONFIRMADO",  new Date(fechaRealizado.getTime() - 3 * 86400000), "Confirmado por administración"),
          crearEstadoTurno("REALIZADO",   fechaRealizado, "Atención completada"),
        ],
      });
    }

    const todosLosTurnos = [...turnosRealizados, ...turnosConfirmados, ...turnosReservados, ...turnosDisponibles];
    await db.collection('turnos').insertMany(todosLosTurnos);
    console.log(`✅ Insertados ${todosLosTurnos.length} turnos`);

    // ===================================================
    // 📊 RESUMEN FINAL
    // ===================================================
    console.log('\n============================================');
    console.log('🌱 Seed de Node completado exitosamente:');
    console.log(`   👤 ${await db.collection('usuarios').countDocuments()} usuarios`);
    console.log(`   🏥 ${await db.collection('servicios').countDocuments()} servicios`);
    console.log(`   🏢 ${await db.collection('sedes').countDocuments()} sedes`);
    console.log(`   👨‍⚕️ ${await db.collection('medicos').countDocuments()} médicos`);
    console.log(`   🧑‍⚕️ ${await db.collection('pacientes').countDocuments()} pacientes`);
    console.log(`   📅 ${await db.collection('turnos').countDocuments()} turnos`);
    console.log('============================================\n');

  } catch (error) {
    console.error('❌ Error durante el proceso de seeding:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada.');
    process.exit(0);
  }
}

run();
