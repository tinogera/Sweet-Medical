import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/headers/Header';


export default function Home() {
  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased font-body-main selection:bg-primary-container selection:text-white min-h-screen">
      <Header usuario="Franco" />
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
          <Link to="/medicos" className="block bg-bg-alternate rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 hover:bg-surface-container hover:shadow-sm group border border-transparent hover:border-outline-variant">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>person_search</span>
            </div>
            <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-3">Buscar por Profesional</h2>
            <p className="font-body-sm text-body-sm text-text-secondary mb-6">Si ya conocés el nombre o apellido del médico que buscás.</p>
            <div className="mt-auto px-8 py-3 rounded-full border border-secondary text-secondary font-cta-label text-cta-label group-hover:bg-primary-container group-hover:text-white group-hover:border-primary-container transition-colors w-full md:w-auto">
              Buscar por nombre
            </div>
          </Link>
          {/* Option 2: Por Especialidad */}
          <Link to="/servicios" className="block bg-bg-alternate rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 hover:bg-surface-container hover:shadow-sm group border border-transparent hover:border-outline-variant">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-primary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            </div>
            <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-3">Buscar por Especialidad</h2>
            <p className="font-body-sm text-body-sm text-text-secondary mb-6">Buscá por servicio médico, clínica o centro de atención.</p>
            <div className="mt-auto px-8 py-3 rounded-full border border-secondary text-secondary font-cta-label text-cta-label group-hover:bg-primary-container group-hover:text-white group-hover:border-primary-container transition-colors w-full md:w-auto">
              Buscar servicio
            </div>
          </Link>
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