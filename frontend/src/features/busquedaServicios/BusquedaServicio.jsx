import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVICIOS = [
  { label: 'Cardiología',  icon: 'cardiology',   tipo: 'especialidad', valor: 'cardiología'  },
  { label: 'Pediatría',    icon: 'pediatrics',    tipo: 'especialidad', valor: 'pediatría'    },
  { label: 'Dermatología', icon: 'dermatology',   tipo: 'especialidad', valor: 'dermatología' },
  { label: 'Laboratorio',  icon: 'biotech',       tipo: 'practica',     valor: 'análisis'     },
];

export default function BusquedaServicio() {
  const navigate = useNavigate();
  const [seleccionado, setSeleccionado] = useState(null);

  const irAFecha = () => {
    if (!seleccionado) return;
    const state = seleccionado.tipo === 'especialidad'
      ? { tipo: 'servicio', especialidad: seleccionado.valor, label: seleccionado.label }
      : { tipo: 'servicio', practica: seleccionado.valor,    label: seleccionado.label };
    navigate('/fecha', { state });
  };

  return (
    <main className="flex-grow flex flex-col items-center py-section-padding px-margin-mobile md:px-gutter w-full">
      <div className="w-full max-w-[800px] flex flex-col gap-12">
        {/* Progress Header */}
        <div className="flex flex-col gap-4 text-center">
          <div className="flex items-center justify-center gap-4 text-secondary font-cta-label text-body-sm">
            <span className="text-primary-container font-bold">PASO 1 DE 3</span>
            <span className="w-1 h-1 bg-outline rounded-full"></span>
            <span>Búsqueda de Servicio</span>
          </div>
          <div className="w-full bg-secondary-container h-2 rounded-full overflow-hidden">
            <div className="bg-primary-container h-full w-1/3 rounded-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center flex flex-col gap-4">
          <h1 className="font-h2-section-mobile text-h2-section-mobile md:font-h2-section md:text-h2-section text-on-surface">
            ¿Qué servicio estás buscando?
          </h1>
          <p className="font-body-main text-body-main text-text-secondary max-w-[600px] mx-auto">
            Seleccioná la especialidad médica o el estudio que necesitás.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full group">
          <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary-container transition-colors">
            search
          </span>
          <input
            className="w-full h-16 pl-14 pr-6 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface font-body-main text-body-main focus:ring-0 focus:border-primary-container transition-colors placeholder:text-secondary-fixed-dim shadow-sm"
            placeholder="Ej. Cardiología, Ecografía, Laboratorio..."
            type="text"
          />
        </div>

        {/* Service Cards */}
        <div className="flex flex-col gap-6">
          <h3 className="font-cta-label text-cta-label text-on-surface-variant">Servicios Sugeridos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICIOS.map((svc) => {
              const isSelected = seleccionado?.label === svc.label;
              return (
                <button
                  key={svc.label}
                  onClick={() => setSeleccionado(svc)}
                  className={`flex items-center justify-between p-6 rounded-xl border transition-all group text-left ${
                    isSelected
                      ? 'border-2 border-primary-container bg-surface-container shadow-[0_0_0_4px_rgba(226,0,26,0.1)]'
                      : 'border-outline-variant bg-surface-container-lowest hover:border-primary-container hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-primary-container text-white' : 'bg-surface-container-high text-primary-container group-hover:bg-primary-container group-hover:text-white'
                    }`}>
                      <span className="material-symbols-outlined">{svc.icon}</span>
                    </div>
                    <span className="font-cta-label text-body-main text-on-surface">{svc.label}</span>
                  </div>
                  <span className={`material-symbols-outlined transition-colors ${isSelected ? 'text-primary-container' : 'text-secondary group-hover:text-primary-container'}`}>
                    chevron_right
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={irAFecha}
            disabled={!seleccionado}
            className={`px-8 py-4 font-cta-label text-cta-label rounded-full transition-colors w-full md:w-auto ${
              seleccionado
                ? 'bg-primary-container text-on-primary hover:opacity-90 shadow-sm'
                : 'bg-secondary-container text-secondary cursor-not-allowed'
            }`}
          >
            Siguiente Paso
          </button>
        </div>
      </div>
    </main>
  );
}
