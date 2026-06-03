// ── Repositorios ──
import { MedicoRepository } from "../repositories/MedicoRepository.js";
import { PacienteRepository } from "../repositories/PacienteRepository.js";
import { SedeRepository } from "../repositories/SedeRepository.js";
import { ServicioRepository } from "../repositories/ServicioRepository.js";
import { TurnoRepositoryImpl } from "../repositories/TurnoRepository.js";
import { UsuarioRepository } from "../repositories/UsuarioRepository.js";

const medicoRepo = new MedicoRepository();
const pacienteRepo = new PacienteRepository();
const sedeRepo = new SedeRepository();
const servicioRepo = new ServicioRepository();
const turnoRepo = new TurnoRepositoryImpl();
const usuarioRepo = new UsuarioRepository();

// ── Servicios ──
import { BusquedaTurnoService } from "../services/BusquedaTurnoService.js";
import { GestionServiciosService } from "../services/GestionServiciosService.js";
import { MedicoService } from "../services/MedicoService.js";
import { NotificacionService } from "../services/NotificacionService.js";
import { PacienteService } from "../services/PacienteService.js";
import { SeederService } from "../services/SeederService.js";
import { TurnoService } from "../services/TurnoService.js";

const busquedaTurnoService = new BusquedaTurnoService({
  turnoRepository: turnoRepo,
  pacienteRepository: pacienteRepo,
});

const gestionServiciosService = new GestionServiciosService({
  medicoRepository: medicoRepo,
  servicioRepository: servicioRepo,
});

const medicoService = new MedicoService({
  medicoRepository: medicoRepo,
  turnoRepository: turnoRepo,
  sedeRepository: sedeRepo,
  servicioRepository: servicioRepo,
});

const notificacionService = new NotificacionService({
  usuarioRepository: usuarioRepo,
});

const pacienteService = new PacienteService(pacienteRepo, turnoRepo);

const seederService = new SeederService({
  pacienteRepository: pacienteRepo,
  turnoRepository: turnoRepo,
  medicoRepository: medicoRepo,
  servicioRepository: servicioRepo,
  sedeRepository: sedeRepo,
});

const turnoService = new TurnoService({
  turnoRepository: turnoRepo,
  pacienteRepository: pacienteRepo,
  medicoRepository: medicoRepo,
});

// ── Controllers ──
import { BusquedaTurnoController } from "../controllers/BusquedaTurnoController.js";
import { GestionServiciosController } from "../controllers/GestionServiciosController.js";
import { MedicoController } from "../controllers/MedicoController.js";
import { NotificacionController } from "../controllers/NotificacionController.js";
import { PacienteController } from "../controllers/PacienteController.js";
import { SeederController } from "../controllers/SeederController.js";
import { TurnoController } from "../controllers/TurnoController.js";

export const busquedaTurnoController = new BusquedaTurnoController({
  busquedaTurnoService,
});

export const gestionServiciosController = new GestionServiciosController({
  gestionServiciosService,
});

export const medicoController = new MedicoController({
  medicoService,
});

export const notificacionController = new NotificacionController({
  notificacionService,
});

export const pacienteController = new PacienteController({
  pacienteService,
});

export const seederController = new SeederController({
  seederService,
});

export const turnoController = new TurnoController({
  turnoService,
});
