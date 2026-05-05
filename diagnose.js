import app from './server/app.js';
import { SeederService } from './server/services/SeederService.js';
import { BusquedaTurnoService } from './server/services/BusquedaTurnoService.js';

async function diagnose() {
    console.log("--- Starting Diagnosis ---");
    const seeder = new SeederService();
    const busqueda = new BusquedaTurnoService();

    try {
        console.log("1. Seeding data...");
        await seeder.seed();
        console.log("Seeding successful.");

        console.log("2. Testing BusquedaTurnoService directly...");
        const result = await busqueda.buscarTurnos({
            idPaciente: 1,
            filtros: {
                fechaDesde: new Date("2026-05-04T00:00:00.000"),
                fechaHasta: new Date("2026-05-07T23:59:59.999")
            }
        });
        console.log("Service call successful. Turnos found:", result.turnosDTO.length);
    } catch (error) {
        console.error("DIAGNOSIS ERROR:");
        console.error(error);
        if (error.stack) console.error(error.stack);
    }
}

diagnose();
