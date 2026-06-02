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
import { MedicoRepository } from "../repositories/MedicoRepository.js"
import { ServicioRepository } from "../repositories/ServicioRepository.js"
import { SedeRepository } from "../repositories/SedeRepository.js"
import { TurnoModel } from "../schemas/turno.schema.js"

export class SeederService {
  async seed() {
    const servicioRepository = new ServicioRepository()

    // 0. Limpiar repositorios para evitar duplicados si se llama varias veces
    PacienteRepository.pacientes = []
    await TurnoModel.deleteMany({})
    MedicoRepository.medicos = []
    await servicioRepository.deleteAll()
    SedeRepository.sedes = []

    // 1. Crear Ubicación y Sedes
    const ubicacionPalermo = new Ubicacion(-34.5889, -58.4306)
    const sedePalermo = new Sede("Sede Palermo", ubicacionPalermo)

    const ubicacionBelgrano = new Ubicacion(-34.5621, -58.4564)
    const sedeBelgrano = new Sede("Sede Belgrano", ubicacionBelgrano)

    SedeRepository.agregar(sedeBelgrano)
    SedeRepository.agregar(sedePalermo)

    // 2. Crear Servicios (Especialidades y Prácticas)
    const cardiologia = new Servicio(TipoServicio.ESPECIALIDAD, "Cardiología", 2500, 20)
    const pediatria = new Servicio(TipoServicio.ESPECIALIDAD, "Pediatría", 2000, 30)
    const radiografia = new Servicio(TipoServicio.PRACTICA, "Radiografía de Tórax", 5000, 15)
    const ecografia = new Servicio(TipoServicio.PRACTICA, "Ecografía Abdominal", 7000, 30)
    await servicioRepository.save(cardiologia)
    await servicioRepository.save(pediatria)
    await servicioRepository.save(radiografia)
    await servicioRepository.save(ecografia)

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

    await pacienteRepository.agregarPaciente(pacienteJuan) // ID 1
    await pacienteRepository.agregarPaciente(pacienteAna)  // ID 2

    // 5. Crear Médicos
    const medicoGomez = new Medico("Carlos", "Gomez", "12344444")
    medicoGomez.agregarSede(sedePalermo)
    medicoGomez.agregarSede(sedeBelgrano)
    medicoGomez.agregarServicio(cardiologia)
    medicoGomez.agregarServicio(radiografia)

    medicoGomez.agregarDisponibilidad(new Date("2026-05-13T14:30:00"), new Date("2026-05-13T21:30:00"), sedePalermo, cardiologia)

    MedicoRepository.agregarMedico(medicoGomez)

    const medicoLopez = new Medico("Laura", "Lopez", "55555555")
    medicoLopez.agregarSede(sedeBelgrano)
    medicoLopez.agregarServicio(pediatria)
    medicoLopez.agregarServicio(ecografia)
    medicoLopez.agregarServicio(cardiologia)

    MedicoRepository.agregarMedico(medicoLopez)

    // 6. Crear Turnos (Fechas futuras)
    const hoy = new Date()

    const fecha1 = new Date(hoy)
    fecha1.setDate(hoy.getDate() + 2)
    fecha1.setHours(10, 0, 0)

    const fecha2 = new Date(hoy)
    fecha2.setDate(hoy.getDate() + 3)
    fecha2.setHours(15, 30, 0)

    const fecha3 = new Date(hoy)
    fecha3.setDate(hoy.getDate() + 5)
    fecha3.setHours(9, 0, 0)

    // Turno 1: Cardiología en Palermo con Gomez
    const turno1 = new Turno(fecha1, medicoGomez, cardiologia, sedePalermo)
    turno1.reservar(pacienteAna)
    // Turno 2: Radiografía en Belgrano con Gomez
    const turno2 = new Turno(fecha2, medicoGomez, radiografia, sedeBelgrano)
    turno2.reservar(pacienteAna)
    // Turno 3: Pediatría en Belgrano con Lopez
    const turno3 = new Turno(fecha3, medicoLopez, pediatria, sedeBelgrano)
    turno3.reservar(pacienteJuan)

    const turno4 = new Turno(fecha1, medicoLopez, pediatria, sedeBelgrano)
    const turno5 = new Turno(fecha2, medicoGomez, radiografia, sedeBelgrano)
    const turno6 = new Turno(fecha3, medicoGomez, cardiologia, sedePalermo)

    await TurnoRepository.agregarTurno(turno1)
    await TurnoRepository.agregarTurno(turno2)
    await TurnoRepository.agregarTurno(turno3)
    await TurnoRepository.agregarTurno(turno4)
    await TurnoRepository.agregarTurno(turno5)
    await TurnoRepository.agregarTurno(turno6)

    // Paciente Juan, Ana. Medico Gomez, Lopez. 
    const notificaciones = [
      new Notificacion({ destinatario: "test@mail.com", mensaje: "Recordatorio: Tienes un turno de Cardiología" }),
      new Notificacion({ destinatario: "test@mail.com", mensaje: "Turno confirmado: Radiografía en Belgrano" }),
      new Notificacion({ destinatario: "test@mail.com", mensaje: "Turno cancelado: Pediatría en Belgrano" }),
      new Notificacion({ destinatario: "test@mail.com", mensaje: "Recordatorio: Tienes un turno de Radiografía en Belgrano" }),
    ]
    
    let NOTIFICACIONES_ID = 1
    for (const n of notificaciones){ n.id = NOTIFICACIONES_ID++}
    const personas = [pacienteJuan, pacienteAna, medicoGomez, medicoLopez]
    for (const [i, persona] of personas.entries()) {
      persona.recibirNotificacion(notificaciones[i])
      if (persona instanceof Paciente) {
        await pacienteRepository.guardarUsuario(persona)
      }
    }
    
    const todosLosTurnosLibres = MedicoRepository.medicos.flatMap(medico =>
            medico.agenda.flatMap(bloque => medico.generarTurnos(bloque))
        );

        // Los agregamos al repositorio de turnos
        for (const turno of todosLosTurnosLibres) { 
                await TurnoRepository.agregarTurno(turno);
        }
    
    console.log("Seeding completado: 2 pacientes, 2 médicos, 3 turnos cargados.")
  }
}
