import React from 'react';
import BuscarPacienteForm from '../../components/buscarPacienteForm/BuscarPacienteForm';
import TurnoCard from '../../components/turnos/TurnoCard';
import HistorialTurnosTable from '../../components/turnos/HistorialTurnosTable';

export default function TurnosUsuario() {
  return (
    <main className="flex-grow py-8 md:py-section-padding px-margin-mobile md:px-gutter max-w-[900px] mx-auto w-full">
      <div className="mb-8 text-center md:text-left">
        <h1 className="font-h1-hero-mobile text-h1-hero-mobile md:font-h1-hero md:text-h1-hero text-on-surface mb-2">
          Mis Turnos
        </h1>
        <p className="font-body-main text-body-main text-text-secondary">
          Consultá tus próximos turnos, revisá el historial reciente o cancelá tus citas activas.
        </p>
      </div>

      <BuscarPacienteForm />

      <div className="flex flex-col gap-12">
        <section>
          <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">event</span>
            Turnos Próximos
          </h2>

          <div className="flex flex-col gap-6">
            <TurnoCard />
          </div>
        </section>

        <section>
          <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface-variant mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">history</span>
            Historial Reciente (Últimos 3 meses)
          </h2>

          <HistorialTurnosTable />
        </section>
      </div>
    </main>
  );
}
