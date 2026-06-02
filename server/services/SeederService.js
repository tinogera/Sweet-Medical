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

import { pacienteRepository } from "../repositories/PacienteRepository.js"
import { TurnoRepository } from "../repositories/TurnoRepository.js"
import { medicoRepository } from "../repositories/MedicoRepository.js"
import { servicioRepository } from "../repositories/ServicioRepository.js"
import { sedeRepository } from "../repositories/SedeRepository.js"
import { TurnoModel } from "../schemas/turno.schema.js"
import { SedeModel } from "../schemas/sedeSchema.js"
import { UsuarioModel } from "../schemas/usuario.schema.js"

export class SeederService {
  async seed() {
    // 0. Limpiar base de datos para evitar duplicados
    await pacienteRepository.limpiar()
    await TurnoModel.deleteMany({})
    await medicoRepository.deleteAll()
    await servicioRepository.deleteAll()
    await SedeModel.deleteMany({})
    await UsuarioModel.deleteMany({})

    // 1. Crear Ubicación y Sedes
    const ubicacionPalermo = new Ubicacion("-34.5889", "-58.4306")
    const sedePalermo = new Sede("Sede Palermo", ubicacionPalermo)

    const ubicacionBelgrano = new Ubicacion("-34.5621", "-58.4564")
    const sedeBelgrano = new Sede("Sede Belgrano", ubicacionBelgrano)

    const sp = await sedeRepository.agregar(sedePalermo)
    const sb = await sedeRepository.agregar(sedeBelgrano)

    // 2. Crear Servicios (Especialidades y Prácticas)
    const cardiologia = new Servicio(TipoServicio.ESPECIALIDAD, "Cardiología", 2500, 20)
    const pediatria = new Servicio(TipoServicio.ESPECIALIDAD, "Pediatría", 2000, 30)
    const radiografia = new Servicio(TipoServicio.PRACTICA, "Radiografía de Tórax", 5000, 15)
    const ecografia = new Servicio(TipoServicio.PRACTICA, "Ecografía Abdominal", 7000, 30)
    
    cardiologia._id = (await servicioRepository.save(cardiologia))._id
    pediatria._id = (await servicioRepository.save(pediatria))._id
    radiografia._id = (await servicioRepository.save(radiografia))._id
    ecografia._id = (await servicioRepository.save(ecografia))._id

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

    await pacienteRepository.agregarPaciente(pacienteJuan)
    await pacienteRepository.agregarPaciente(pacienteAna)

    // 5. Crear Médicos
    const medicoGomez = new Medico("Carlos", "Gomez", "12344444")
    medicoGomez.agregarSede(sp)
    medicoGomez.agregarSede(sb)
    medicoGomez.agregarServicio(cardiologia)
    medicoGomez.agregarServicio(radiografia)

    medicoGomez.agregarDisponibilidad(
      new Date("2026-06-13T14:30:00"), 
      new Date("2026-06-13T21:30:00"), 
      sp
    )

    await medicoRepository.save(medicoGomez)

    const medicoLopez = new Medico("Laura", "Lopez", "55555555")
    medicoLopez.agregarSede(sb)
    medicoLopez.agregarServicio(pediatria)
    medicoLopez.agregarServicio(ecografia)
    medicoLopez.agregarServicio(cardiologia)

    await medicoRepository.save(medicoLopez)

    // 6. Generar Turnos desde la agenda de los médicos
    const medicos = await medicoRepository.findAll()
    for (const medico of medicos) {
      for (const bloque of medico.agenda) {
        const turnos = medico.generarTurnos(bloque)
        for (const t of turnos) {
          await TurnoRepository.agregarTurno(t)
        }
      }
    }

    // 7. Reservar algunos turnos para pruebas
    const todosLosTurnos = await TurnoRepository.listar()
    if (todosLosTurnos.length >= 3) {
      // Reservamos el primero para Ana con Cardiologia
      await todosLosTurnos[0].reservar(pacienteAna, cardiologia)
      await TurnoRepository.guardarturno(todosLosTurnos[0]._id, todosLosTurnos[0])

      // Reservamos el segundo para Juan con Cardiologia
      await todosLosTurnos[1].reservar(pacienteJuan, cardiologia)
      await TurnoRepository.guardarturno(todosLosTurnos[1]._id, todosLosTurnos[1])
    }
    
    console.log("Seeding completado exitosamente en MongoDB.")
  }
}
