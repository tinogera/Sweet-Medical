import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/headers/Header';
import BusquedasEspecificas from '../../components/busquedasEspecificas/BusquedasEspecificas';
import PiePagina from '../../components/piePagina/PiePagina';

const recientes = [
  { id: 1, nombre: "Turno con Dra. García", detalle: "Cardióloga - 12/09/2024" },
  { id: 2, nombre: "Turno con Dr. López", detalle: "Dermatólogo - 05/08/2024" },
];

export default function Home() {
  return (
    <div className="bg-surface-container-lowest font-body-main text-on-surface min-h-screen flex flex-col">
      <Header></Header>

      {/* Main Content */}
      <main className="flex-grow pt-[120px] pb-section-padding px-gutter max-w-container-max mx-auto w-full">
        <div className="mb-9">
          <h1 className="font-h1-display text-h1-display text-on-surface mb-2.5 text-4xl md:text-5xl font-bold">Búsqueda de Turnos</h1>
          <p className="font-body-main text-body-main text-text-secondary max-w-xl">Seleccioná cómo querés buscar tu próximo turno médico.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/medicos" className="group block border border-red-500 rounded-xl p-6">
            <BusquedasEspecificas
              icon="person_search"
              title="Buscar por Profesional"
              description="Si ya conocés el nombre o apellido del médico que buscás."
            />
          </Link>
          
          <Link to="/servicios" className="group block border border-red-500 rounded-xl p-6">
            <BusquedasEspecificas
              icon="medical_services"
              title="Buscar por Especialidad"
              description="Buscá por servicio médico, clínica o centro de atención."
            />
          </Link>
        </div>
        
        <section className="mt-12">
          <h3 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-4">Turnos Recientes</h3>

          {recientes.length > 0 ? (
            <div className="flex flex-col gap-3">
              {recientes.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-4 bg-surface border border-outline-variant rounded-lg p-4 transition-colors hover:border-primary"
                >
                  <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#FFE5E5' }}>
                    <span className="material-symbols-outlined text-xl text-primary">history</span>
                  </span>
                  <div className="flex-grow min-w-0">
                    <div className="font-cta-label text-cta-label text-on-surface">{r.nombre}</div>
                    <div className="font-body-sm text-body-sm text-text-secondary">{r.detalle}</div>
                  </div>
                  <button
                    type="button"
                    className="font-cta-label text-primary font-bold rounded-lg px-3 py-2 hover:bg-primary-container transition-colors shrink-0"
                  >
                    Repetir turno
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-outline-variant rounded-xl p-12 text-center bg-surface-container-low">
              <span className="material-symbols-outlined text-4xl text-secondary-fixed-dim">history</span>
              <p className="font-body-main text-body-main text-on-surface mt-3 font-semibold">
                Todavía no tenés turnos recientes
              </p>
              <p className="font-body-sm text-body-sm text-text-secondary mt-1">
                Cuando saques un turno, vas a poder repetirlo desde acá.
              </p>
            </div>
          )}
        </section>
      </main>
      
     <PiePagina></PiePagina>
    </div>
  );
}