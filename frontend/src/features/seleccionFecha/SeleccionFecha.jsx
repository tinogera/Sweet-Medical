import React from 'react';
import PiePagina from '../../components/piePagina/PiePagina';

export default function SeleccionFecha() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* Header / TopNavBar (Simplified for transactional flow - Navigation suppressed as per rules) */}
      <header className="bg-surface border-b border-outline-variant w-full sticky top-0 z-50">
        <div className="flex justify-between items-center h-20 px-gutter max-w-container-max mx-auto w-full">
          <div className="flex items-center gap-4">
            {/* Back Button for Transactional Flow */}
            <button className="text-secondary hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-bg-alternate">
              <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
            </button>
            <div className="font-h2-section text-h2-section text-primary uppercase tracking-tight hidden md:block">SWISS MEDICAL</div>
            <div className="font-h2-section-mobile text-h2-section-mobile text-primary uppercase tracking-tight md:hidden">SWISS MEDICAL</div>
          </div>
          {/* Wizard Progress Indicator */}
          <div className="flex items-center gap-2">
            <span className="font-body-sm text-body-sm text-text-secondary">Paso 2 de 3</span>
            <div className="flex gap-1">
              <div className="w-8 h-2 rounded-full bg-primary"></div>
              <div className="w-8 h-2 rounded-full bg-primary"></div>
              <div className="w-8 h-2 rounded-full bg-outline-variant"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-section-padding px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full max-w-3xl">
        <div className="mb-12 text-center md:text-left">
          <h1 className="font-h1-hero-mobile text-h1-hero-mobile md:font-h1-hero md:text-h1-hero text-on-background mb-4">Seleccioná la Fecha</h1>
          <p className="font-body-main text-body-main text-text-secondary">Elegí el día y horario que mejor se adapte a tu disponibilidad para continuar con la reserva del turno.</p>
        </div>

        {/* Summary Card (Selected Service/Doctor) */}
        <div className="bg-surface rounded-xl p-6 mb-12 flex items-start gap-6 relative border border-outline-variant shadow-sm">
          <div className="w-16 h-16 rounded-full bg-bg-alternate overflow-hidden flex-shrink-0 border border-outline-variant">
            <img alt="Doctor profile" className="w-full h-full object-cover" data-alt="A professional headshot of a female doctor in a modern, brightly lit clinical setting. She wears a crisp white medical coat over a professional shirt, exuding confidence and approachability. The background is slightly blurred, featuring clean white walls and subtle red accents that align with a modern corporate healthcare brand identity. High key lighting emphasizes clarity and a minimalist aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN1Ibe8rZsim1ALXtZPu_sKoxXFuwNvpQ1nAX0sZbQB7Iz9La75GxTSJaxhQVDn30prsM-GJVatrpbNo_4BezU7PMq_U7kEhG92_uYs9Zwo7Bp1gPV2qAjl09vDmr67lhj6EO-t-Rnjg5WyNNxxm1b0_jgSNcyfdgwcXx0oDn8FZenY_5cYr3bkIhsAvjhjpFNQbel7TkPpxAzX6diG2In_3qd58GKXZh0MIXFvtdzIRdsQ6P0w6GB7hMU8zcPI6htbAvT9gm7JtCn" />
          </div>
          <div>
            <span className="font-body-sm text-body-sm text-primary uppercase font-bold tracking-wide mb-1 block">Cardiología Clínica</span>
            <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-2">Dra. Martinez, Ana Laura</h2>
            <div className="flex items-center gap-2 text-text-secondary font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px]" data-icon="location_on">location_on</span>
              <span>Centro Médico Barrio Norte (Av. Pueyrredón 1441)</span>
            </div>
          </div>
          <button className="absolute top-6 right-6 text-primary font-body-sm text-body-sm underline hover:opacity-80 transition-opacity">
            Cambiar
          </button>
        </div>

        {/* Date Selection */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-h3-subtitle text-h3-subtitle text-on-surface">Fechas Disponibles</h3>
            <span className="font-body-sm text-body-sm text-text-secondary">Septiembre 2024</span>
          </div>

          {/* Horizontal Date List */}
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
            {/* Date Card 1: Today (No availability) */}
            <button className="snap-start flex-shrink-0 w-24 h-28 rounded-lg border border-outline-variant bg-bg-alternate flex flex-col items-center justify-center opacity-50 cursor-not-allowed">
              <span className="font-body-sm text-body-sm text-text-secondary uppercase mb-1">Hoy</span>
              <span className="font-h3-subtitle text-h3-subtitle text-text-secondary">12</span>
              <span className="font-body-sm text-body-sm text-text-secondary mt-2">Sin turnos</span>
            </button>

            {/* Date Card 2: Tomorrow (Available - Unselected) */}
            <button className="snap-start flex-shrink-0 w-24 h-28 rounded-lg border border-outline-variant bg-surface flex flex-col items-center justify-center hover:bg-bg-alternate transition-colors cursor-pointer group shadow-sm">
              <span className="font-body-sm text-body-sm text-text-secondary uppercase mb-1">Mañ</span>
              <span className="font-h3-subtitle text-h3-subtitle text-on-surface">13</span>
              <div className="w-2 h-2 rounded-full bg-primary mt-3 group-hover:scale-110 transition-transform"></div>
            </button>

            {/* Date Card 3: Selected */}
            <button className="snap-start flex-shrink-0 w-24 h-28 rounded-lg border-2 border-primary bg-surface-container flex flex-col items-center justify-center cursor-pointer shadow-[0_0_0_4px_rgba(226,0,26,0.1)] transition-all">
              <span className="font-body-sm text-body-sm text-primary uppercase font-bold mb-1">Vie</span>
              <span className="font-h3-subtitle text-h3-subtitle text-primary font-bold">14</span>
              <div className="w-2 h-2 rounded-full bg-primary mt-3"></div>
            </button>

            {/* Date Card 4: Available */}
            <button className="snap-start flex-shrink-0 w-24 h-28 rounded-lg border border-outline-variant bg-surface flex flex-col items-center justify-center hover:bg-bg-alternate transition-colors cursor-pointer group shadow-sm">
              <span className="font-body-sm text-body-sm text-text-secondary uppercase mb-1">Lun</span>
              <span className="font-h3-subtitle text-h3-subtitle text-on-surface">17</span>
              <div className="w-2 h-2 rounded-full bg-primary mt-3 group-hover:scale-110 transition-transform"></div>
            </button>

            {/* Date Card 5: Available */}
            <button className="snap-start flex-shrink-0 w-24 h-28 rounded-lg border border-outline-variant bg-surface flex flex-col items-center justify-center hover:bg-bg-alternate transition-colors cursor-pointer group shadow-sm">
              <span className="font-body-sm text-body-sm text-text-secondary uppercase mb-1">Mar</span>
              <span className="font-h3-subtitle text-h3-subtitle text-on-surface">18</span>
              <div className="w-2 h-2 rounded-full bg-primary mt-3 group-hover:scale-110 transition-transform"></div>
            </button>

            {/* See Calendar */}
            <button className="snap-start flex-shrink-0 w-24 h-28 rounded-lg border border-dashed border-outline-variant bg-surface flex flex-col items-center justify-center hover:bg-bg-alternate transition-colors cursor-pointer text-text-secondary hover:text-primary shadow-sm">
              <span className="material-symbols-outlined mb-2" data-icon="calendar_month">calendar_month</span>
              <span className="font-body-sm text-body-sm text-center px-2 leading-tight">Ver más<br />fechas</span>
            </button>
          </div>
        </div>

        {/* Time Selection */}
        <div className="mb-12 animate-fade-in">
          <h3 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-6">Horarios Disponibles (Viernes 14)</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            <button className="py-3 px-4 rounded border border-outline-variant bg-surface font-body-main text-body-main text-on-surface hover:bg-bg-alternate transition-colors shadow-sm">09:00</button>
            <button className="py-3 px-4 rounded border border-outline-variant bg-surface font-body-main text-body-main text-on-surface hover:bg-bg-alternate transition-colors shadow-sm">09:30</button>
            <button className="py-3 px-4 rounded border border-outline-variant bg-surface font-body-main text-body-main text-on-surface hover:bg-bg-alternate transition-colors shadow-sm">10:15</button>
            <button className="py-3 px-4 rounded border-2 border-primary bg-surface-container font-body-main text-body-main text-primary font-bold shadow-[0_0_0_4px_rgba(226,0,26,0.1)]">11:00</button>
            <button className="py-3 px-4 rounded border border-outline-variant bg-surface font-body-main text-body-main text-on-surface hover:bg-bg-alternate transition-colors shadow-sm">11:45</button>
            <button className="py-3 px-4 rounded border border-outline-variant bg-surface font-body-main text-body-main text-on-surface hover:bg-bg-alternate transition-colors shadow-sm">14:00</button>
            <button className="py-3 px-4 rounded border border-outline-variant bg-surface font-body-main text-body-main text-on-surface hover:bg-bg-alternate transition-colors shadow-sm">15:30</button>
            <button className="py-3 px-4 rounded border border-outline-variant bg-surface font-body-main text-body-main text-on-surface hover:bg-bg-alternate transition-colors shadow-sm">16:15</button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-4 mt-8 pt-8 border-t border-outline-variant">
          <button className="w-full md:w-auto px-8 py-4 rounded-full border border-secondary text-secondary font-cta-label text-cta-label hover:bg-bg-alternate transition-colors bg-surface">
            Cancelar
          </button>
          <button className="w-full md:w-auto px-10 py-4 rounded-full bg-primary-container text-on-primary font-cta-label text-cta-label hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2">
            Continuar
            <span className="material-symbols-outlined text-[20px]" data-icon="arrow_forward">arrow_forward</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <PiePagina></PiePagina>
    </div>
  );
}