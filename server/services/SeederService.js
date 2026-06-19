import { Paciente } from "../domain/personas/paciente.js"
import { Medico } from "../domain/personas/medico.js"
import { Turno } from "../domain/turnos/turno.js"
import { Servicio, TipoServicio } from "../domain/servicios/servicio.js"
import { ObraSocial } from "../domain/obrasSociales/obraSocial.js"
import { Plan } from "../domain/obrasSociales/plan.js"
import { Sede } from "../domain/sedes/sede.js"
import { Cobertura } from "../domain/obrasSociales/cobertura.js"
import { Ubicacion } from "../domain/sedes/ubicacion.js"
import { Notificacion } from "../domain/notificaciones/notificacion.js"

import { TurnoModel } from "../schemas/turno.schema.js"
import { SedeModel } from "../schemas/sedeSchema.js"
import { UsuarioModel } from "../schemas/usuario.schema.js"

export class SeederService {
  constructor({
    pacienteRepository,
    turnoRepository,
    medicoRepository,
    servicioRepository,
    sedeRepository,
  } = {}) {
    this.pacienteRepository = pacienteRepository;
    this.turnoRepository = turnoRepository;
    this.medicoRepository = medicoRepository;
    this.servicioRepository = servicioRepository;
    this.sedeRepository = sedeRepository;
  }

  async seed() {
    // 0. Limpiar base de datos para evitar duplicados
    await this.pacienteRepository.limpiar()
    await TurnoModel.deleteMany({})
    await this.medicoRepository.deleteAll()
    await this.servicioRepository.deleteAll()
    await SedeModel.deleteMany({})
    await UsuarioModel.deleteMany({})

    // 1. Crear Ubicación y Sedes
    const ubicacionPalermo = new Ubicacion("-34.5889", "-58.4306")
    const sedePalermo = new Sede("Sede Palermo", ubicacionPalermo)

    const ubicacionBelgrano = new Ubicacion("-34.5621", "-58.4564")
    const sedeBelgrano = new Sede("Sede Belgrano", ubicacionBelgrano)

    const sp = await this.sedeRepository.agregar(sedePalermo)
    const sb = await this.sedeRepository.agregar(sedeBelgrano)

    // 2. Crear Servicios (Especialidades y Prácticas)
    const cardiologia = new Servicio(TipoServicio.ESPECIALIDAD, "Cardiología", 2500, 20)
    const pediatria = new Servicio(TipoServicio.ESPECIALIDAD, "Pediatría", 2000, 30)
    const radiografia = new Servicio(TipoServicio.PRACTICA, "Radiografía de Tórax", 5000, 15)
    const ecografia = new Servicio(TipoServicio.PRACTICA, "Ecografía Abdominal", 7000, 30)
    
    cardiologia._id = (await this.servicioRepository.save(cardiologia))._id
    pediatria._id = (await this.servicioRepository.save(pediatria))._id
    radiografia._id = (await this.servicioRepository.save(radiografia))._id
    ecografia._id = (await this.servicioRepository.save(ecografia))._id

    // 3. Crear Obra Social y Planes
    const osde = new ObraSocial("OSDE")
    const plan210 = new Plan("210")
    const plan410 = new Plan("410")
    osde.agregarPlan(plan210)
    osde.agregarPlan(plan410)

    // Coberturas: 100% en consulta para plan 410, 50% para plan 210
    plan410.agregarCobertura(new Cobertura(cardiologia, 100))
    plan210.agregarCobertura(new Cobertura(cardiologia, 50))
    plan210.agregarCobertura(new Cobertura(radiografia, 20))

    // 4. Crear Pacientes
    const pacienteJuan = new Paciente("Juan", "Perez", "12345678", osde, plan210)
    const pacienteAna = new Paciente("Ana", "Gomez", "87654321", osde, plan410)

    await this.pacienteRepository.agregarPaciente(pacienteJuan)
    await this.pacienteRepository.agregarPaciente(pacienteAna)

    // 5. Crear Médicos
    const medicoGomez = new Medico({nombre:"Carlos", apellido: "Gomez", documento: "12344444"})
    medicoGomez.agregarSede(sp)
    medicoGomez.agregarSede(sb)
    medicoGomez.agregarServicio(cardiologia)
    medicoGomez.agregarServicio(radiografia)

    const mañana = new Date()
    mañana.setDate(mañana.getDate() + 1)

    const horaInicio = new Date(mañana)
    horaInicio.setHours(14, 30, 0, 0)

    const horaFin = new Date(mañana)
    horaFin.setHours(21, 30, 0, 0)

    medicoGomez.agregarDisponibilidad(
      horaInicio,
      horaFin,
      sp
    )

    await this.medicoRepository.save(medicoGomez)

    const medicoLopez = new Medico({ nombre: "Laura", apellido: "Lopez", documento: "55555555" })
    medicoLopez.agregarSede(sb)
    medicoLopez.agregarServicio(pediatria)
    medicoLopez.agregarServicio(ecografia)
    medicoLopez.agregarServicio(cardiologia)

    await this.medicoRepository.save(medicoLopez)

    // 6. Generar Turnos desde la agenda de los médicos
    const medicos = await this.medicoRepository.findAll()
    for (const medico of medicos) {
      for (const bloque of medico.agenda) {
        const turnos = medico.generarTurnos(bloque)
        for (const t of turnos) {
          await this.turnoRepository.agregarTurno(t)
        }
      }
    }

    // 7. Reservar algunos turnos para pruebas
    const todosLosTurnosDocs = await this.turnoRepository.listar()
    if (todosLosTurnosDocs.length >= 3) {
      // Reservamos el primero para Ana con Cardiología
      const turno1 = await this.turnoRepository.obtenerPorId(todosLosTurnosDocs[0]._id)
      turno1.reservar(pacienteAna, cardiologia)
      await this.turnoRepository.guardarTurno(turno1)

      // Reservamos el segundo para Juan con Cardiología
      const turno2 = await this.turnoRepository.obtenerPorId(todosLosTurnosDocs[1]._id)
      turno2.reservar(pacienteJuan, cardiologia)
      await this.turnoRepository.guardarTurno(turno2)
    }
    
    console.log("Seeding completado exitosamente en MongoDB.")
  }
}
