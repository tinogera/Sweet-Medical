import React from 'react';

export default function TurnoCard() {
  return (
    <div className="bg-surface rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
      <div className="flex-grow flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
          <span className="material-symbols-outlined">medical_services</span>
        </div>
        <div>
          <span className="font-body-sm text-body-sm text-primary uppercase font-bold tracking-wide mb-1 block">
            Cardiología
          </span>
          <h3 className="font-cta-label text-body-main text-on-surface mb-1">
            Dr. Gomez Carlos
          </h3>
          <div className="flex flex-col gap-1 mt-3 text-text-secondary font-body-sm text-body-sm">
            <p className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              Sede Palermo
            </p>
            <p className="flex items-center gap-1.5 font-semibold text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Martes 30 de Junio - 14:30 hs
            </p>
            <p className="flex items-center gap-1.5 text-primary font-semibold mt-1">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Costo Estimado: $1250
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-stretch md:items-end justify-between gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-outline-variant">
        <span className="self-start md:self-end px-3 py-1 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">
          RESERVADO
        </span>
        <button
          type="button"
          className="px-6 py-3 border border-error text-error hover:bg-error-container hover:text-on-error-container font-cta-label text-body-sm rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">cancel</span>
          Cancelar Turno
        </button>
      </div>
    </div>
  );
}
