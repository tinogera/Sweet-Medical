import React from 'react';

export default function Home() {
  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased font-body-main selection:bg-primary-container selection:text-white min-h-screen">
      {/* TopNavBar */}
      <header className="docked full-width top-0 sticky bg-surface dark:bg-bg-dark border-b border-outline-variant dark:border-secondary z-50 transition-all duration-200 ease-in-out">
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
          <div className="flex items-center gap-2">
            {/* Red square isotype */}
            <div className="w-8 h-8 bg-primary-container rounded-sm flex items-center justify-center text-white font-bold text-xs">SM</div>
            <a className="font-h2-section-mobile md:font-h2-section text-h2-section-mobile md:text-h2-section text-primary dark:text-primary-container uppercase tracking-tight" href="#">SWISS MEDICAL</a>
          </div>
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-primary p-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
          </button>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a className="font-body-main text-body-main text-primary dark:text-primary-container font-bold border-b-2 border-primary pb-1 hover:text-primary dark:hover:text-primary-container transition-colors" href="#">Turnos</a>
            <a className="font-body-main text-body-main text-secondary dark:text-text-dark-mode hover:text-primary dark:hover:text-primary-container transition-colors" href="#">Cartilla</a>
            <a className="font-body-main text-body-main text-secondary dark:text-text-dark-mode hover:text-primary dark:hover:text-primary-container transition-colors" href="#">Planes</a>
            <a className="font-body-main text-body-main text-secondary dark:text-text-dark-mode hover:text-primary dark:hover:text-primary-container transition-colors" href="#">Sucursales</a>
            <a className="bg-primary-container text-white px-6 py-3 rounded-full font-cta-label text-cta-label hover:bg-primary transition-colors ml-4" href="#">Mi Portal</a>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="min-h-screen px-margin-mobile py-8 md:py-section-padding max-w-container-max mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="font-h1-hero-mobile md:font-h1-hero text-h1-hero-mobile md:text-h1-hero text-on-surface mb-2">Búsqueda de Turnos</h1>
          <p className="font-body-main text-body-main text-text-secondary">Seleccioná cómo querés buscar tu próximo turno médico.</p>
        </div>
        {/* Search Options Cards */}
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
          {/* Option 1: Por Nombre */}
          <a className="block bg-bg-alternate rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 hover:bg-surface-container hover:shadow-sm group border border-transparent hover:border-outline-variant" href="#">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>person_search</span>
            </div>
            <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-3">Buscar por Profesional</h2>
            <p className="font-body-sm text-body-sm text-text-secondary mb-6">Si ya conocés el nombre o apellido del médico que buscás.</p>
            <div className="mt-auto px-8 py-3 rounded-full border border-secondary text-secondary font-cta-label text-cta-label group-hover:bg-primary-container group-hover:text-white group-hover:border-primary-container transition-colors w-full md:w-auto">
              Buscar por nombre
            </div>
          </a>
          {/* Option 2: Por Especialidad */}
          <a className="block bg-bg-alternate rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 hover:bg-surface-container hover:shadow-sm group border border-transparent hover:border-outline-variant" href="#">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            </div>
            <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-3">Buscar por Especialidad</h2>
            <p className="font-body-sm text-body-sm text-text-secondary mb-6">Buscá por servicio médico, clínica o centro de atención.</p>
            <div className="mt-auto px-8 py-3 rounded-full border border-secondary text-secondary font-cta-label text-cta-label group-hover:bg-primary-container group-hover:text-white group-hover:border-primary-container transition-colors w-full md:w-auto">
              Buscar servicio
            </div>
          </a>
        </div>
        {/* Quick Access / Recent */}
        <div className="mt-12">
          <h3 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-4">Turnos Recientes</h3>
          <div className="bg-white border border-outline-variant rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-container text-xl">history</span>
              </div>
              <div>
                <p className="font-body-main text-body-main font-semibold text-on-surface">Dr. Juan Pérez</p>
                <p className="font-body-sm text-body-sm text-text-secondary">Cardiología - Clínica Suizo Argentina</p>
              </div>
            </div>
            <button className="text-primary-container font-cta-label text-cta-label hidden md:block hover:underline">Repetir turno</button>
            <button className="md:hidden text-primary-container p-2">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-bg-dark dark:bg-black w-full py-section-padding px-margin-mobile md:px-gutter flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <div className="font-h3-subtitle text-h3-subtitle text-white mb-4">SWISS MEDICAL</div>
          <p className="font-body-sm text-body-sm text-text-dark-mode">© 2024 Swiss Medical Group. Todos los derechos reservados.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <a className="font-body-sm text-body-sm text-text-dark-mode hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Términos y Condiciones</a>
          <a className="font-body-sm text-body-sm text-text-dark-mode hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Privacidad</a>
          <a className="font-body-sm text-body-sm text-text-dark-mode hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Defensa del Consumidor</a>
          <a className="font-body-sm text-body-sm text-text-dark-mode hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Ética y Cumplimiento</a>
        </div>
      </footer>
    </div>
  );
}