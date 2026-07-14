import React from 'react';

export default function BuscarPacienteForm() {
  return (
    <div className="bg-surface border border-outline-variant rounded-xl p-6 mb-8 shadow-sm">
      <h2 className="block font-cta-label text-cta-label text-on-surface mb-2">
        Ingresá tu ID de Paciente
      </h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          className="flex-grow h-14 px-5 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface font-body-main text-body-main focus:outline-none focus:border-primary transition-colors placeholder:text-secondary-fixed-dim shadow-sm"
          placeholder="Ej: 64f7b2e9c25a1b3d4e6f8a9b"
          aria-label="ID del Paciente"
        />
        <button
          type="button"
          className="h-14 px-8 bg-primary-container text-on-primary font-cta-label text-cta-label rounded-full hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">search</span>
          Buscar
        </button>
      </div>
    </div>
  );
}
