import React from 'react';
import Header from '../../components/headers/Header';
import PiePagina from '../../components/piePagina/PiePagina';


export default function BusquedaServicio() {
  return (
    <div className="bg-surface text-on-surface font-body-main antialiased selection:bg-primary-container selection:text-white min-h-screen flex flex-col">
      {/* TopNavBar */}
      <Header></Header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center pt-[140px] pb-section-padding px-margin-mobile md:px-gutter w-full">
        <div className="w-full max-w-[800px] flex flex-col gap-12">
          {/* Progress Header */}
          <div className="flex flex-col gap-4 text-center">
            <div className="flex items-center justify-center gap-4 text-secondary font-cta-label text-lg">
              <span className="text-primary-container font-bold">PASO 1 DE 3</span>
              <span className="w-1 h-1 bg-outline rounded-full"></span>
              <span>Búsqueda de Servicio</span>
            </div>
            <div className="w-full bg-secondary-container h-2 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full w-1/3 rounded-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Title Section */}
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
              className="w-full h-16 pl-14 pr-6 rounded-full border border-outline-variant bg-surface-lowest text-on-surface font-body-main text-body-main focus:ring-0 focus:border-primary-container transition-colors placeholder:text-secondary-fixed-dim shadow-sm"
              placeholder="Ej. Cardiología, Ecografía, Laboratorio..."
              type="text"
            />
          </div>

          {/* Suggested Services Bento */}
          <div className="flex flex-col gap-6">
            <h3 className="font-cta-label text-cta-label text-on-surface-variant">Servicios Sugeridos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Service Card 1 */}
              <button className="flex items-center justify-between p-6 bg-surface-container-lowest border border-outline-variant rounded-xl hover:border-primary-container hover:bg-surface-container transition-all group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container group-hover:text-white transition-colors text-primary-container">
                    <span className="material-symbols-outlined">cardiology</span>
                  </div>
                  <span className="font-cta-label text-body-main text-on-surface">Cardiología</span>
                </div>
                <span className="material-symbols-outlined text-secondary group-hover:text-primary-container transition-colors">chevron_right</span>
              </button>

              {/* Service Card 2 */}
              <button className="flex items-center justify-between p-6 bg-surface-container-lowest border border-outline-variant rounded-xl hover:border-primary-container hover:bg-surface-container transition-all group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container group-hover:text-white transition-colors text-primary-container">
                    <span className="material-symbols-outlined">pediatrics</span>
                  </div>
                  <span className="font-cta-label text-body-main text-on-surface">Pediatría</span>
                </div>
                <span className="material-symbols-outlined text-secondary group-hover:text-primary-container transition-colors">chevron_right</span>
              </button>

              {/* Service Card 3 */}
              <button className="flex items-center justify-between p-6 bg-surface-container-lowest border border-outline-variant rounded-xl hover:border-primary-container hover:bg-surface-container transition-all group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container group-hover:text-white transition-colors text-primary-container">
                    <span className="material-symbols-outlined">dermatology</span>
                  </div>
                  <span className="font-cta-label text-body-main text-on-surface">Dermatología</span>
                </div>
                <span className="material-symbols-outlined text-secondary group-hover:text-primary-container transition-colors">chevron_right</span>
              </button>

              {/* Service Card 4 */}
              <button className="flex items-center justify-between p-6 bg-surface-container-lowest border border-outline-variant rounded-xl hover:border-primary-container hover:bg-surface-container transition-all group text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container group-hover:text-white transition-colors text-primary-container">
                    <span className="material-symbols-outlined">biotech</span>
                  </div>
                  <span className="font-cta-label text-body-main text-on-surface">Laboratorio</span>
                </div>
                <span className="material-symbols-outlined text-secondary group-hover:text-primary-container transition-colors">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-8 flex justify-end">
            <button
              disabled
              className="px-8 py-4 bg-secondary-container text-secondary font-cta-label text-cta-label rounded-full cursor-not-allowed transition-colors w-full md:w-auto"
            >
              Siguiente Paso
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <PiePagina></PiePagina>
    </div>
  );
}