describe("Reserva de Turno test E2E", () => {

  it("Debería buscar un médico, seleccionar una fecha y horario, y confirmar la reserva de un turno correctamente", () => {
    const pacienteId = "paciente-123";
    const medicoId = "medico-123";
    const turnoId = "turno-456";
    const servicioId = "servicio-789";
    const nombreMedico = "Carlos Garcia";
    const nombreEspecialidad = "Cardiología";
    const nombreSede = "Sede Central - Palermo";
    const fechaHoraTurno = "2026-07-20T10:00:00.000Z";

    const respuestaPacientes = [
      {
        id: pacienteId,
        nombre: "Pedro",
        apellido: "Alvarez"
      }
    ];

    const respuestaMedicos = [
      {
        id: medicoId,
        nombre: "Carlos",
        apellido: "Garcia",
        especialidad: nombreEspecialidad
      }
    ];

    const respuestaTurnosDisponibles = {
      turnos: [
        {
          id: turnoId,
          fechaHora: fechaHoraTurno,
          servicioId: servicioId,
          servicio: nombreEspecialidad,
          sede: nombreSede,
          profesional: nombreMedico
        }
      ]
    };

    const respuestaReservaExitosa = {
      id: turnoId,
      fechaHora: fechaHoraTurno,
      servicioId: servicioId,
      servicio: nombreEspecialidad,
      sede: nombreSede,
      profesional: nombreMedico,
      paciente: pacienteId,
      estadoTurno: "RESERVADO"
    };

    const respuestaTurnosPaciente = {
      turnos: [
        {
          id: turnoId,
          fechaHora: fechaHoraTurno,
          servicio: nombreEspecialidad,
          sede: nombreSede,
          profesional: nombreMedico,
          estadoTurno: "RESERVADO"
        }
      ]
    };

    const urlApiBase = "http://localhost:3000";

    cy.intercept("GET", `${urlApiBase}/pacientes`, respuestaPacientes).as("cargarPacientes");
    cy.intercept("GET", `${urlApiBase}/medicos?*`, respuestaMedicos).as("buscarMedicos");
    cy.intercept("GET", `${urlApiBase}/turnos?*`, respuestaTurnosDisponibles).as("cargarTurnosDisponibles");
    cy.intercept("PATCH", `${urlApiBase}/turnos/${turnoId}`, respuestaReservaExitosa).as("reservarTurno");
    cy.intercept("GET", `${urlApiBase}/pacientes/${pacienteId}/turnos?*`, respuestaTurnosPaciente).as("cargarTurnosPaciente");

    cy.visit("/");

    cy.contains("Búsqueda por Profesional").click();

    cy.get('input[placeholder*="Carlos Gardel"]').type("Carlos García");
    cy.contains("button", "Buscar").click();
    cy.wait("@buscarMedicos");

    cy.contains("button", nombreMedico).click();
    cy.wait("@cargarPacientes");
    cy.wait("@cargarTurnosDisponibles");

    cy.get('[data-testid="fecha-card"]').first().click();
    cy.get('[data-testid="horario-slot"]').first().click();
    cy.contains("button", "Continuar").click();

    cy.contains("button", "Confirmar Reserva").click();
    cy.contains("button", "Sí, reservar").click();
    cy.wait("@reservarTurno");
    cy.wait("@cargarTurnosPaciente");

    cy.url().should("include", `/mis-turnos/${pacienteId}`);
    cy.contains("Próximos Turnos").should("be.visible");
    cy.contains(nombreMedico).should("be.visible");
    cy.contains(nombreEspecialidad).should("be.visible");
    cy.contains(nombreSede).should("be.visible");
  });
});
