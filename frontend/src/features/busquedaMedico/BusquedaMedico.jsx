import React from 'react';

export default function BusquedaMedico() {
  return (
    <div className="bg-surface-container-lowest font-body-main text-on-surface min-h-screen flex flex-col">
      {/* TopNavBar (Shared Component) */}
      <header className="bg-surface dark:bg-bg-dark text-primary dark:text-primary-fixed-dim font-cta-label text-cta-label fixed top-0 w-full z-50 border-b border-secondary-fixed dark:border-on-secondary-fixed-variant flat no shadows flex justify-between items-center h-20 px-gutter max-w-container-max mx-auto">
        <div className="font-h1-hero text-h3-subtitle font-black text-primary dark:text-primary-fixed-dim tracking-tighter">
          SWISS MEDICAL
        </div>
        <nav className="hidden md:flex gap-8 h-full items-center">
          <a className="text-primary dark:text-primary-fixed-dim border-b-2 border-primary font-bold pb-1 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 Active: opacity-80 transition-all h-full flex items-center" href="#">Turnos</a>
          <a className="text-secondary dark:text-text-dark-mode font-medium hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 h-full flex items-center" href="#">Cartilla</a>
          <a className="text-secondary dark:text-text-dark-mode font-medium hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 h-full flex items-center" href="#">Planes</a>
          <a className="text-secondary dark:text-text-dark-mode font-medium hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 h-full flex items-center" href="#">Sucursales</a>
        </nav>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4">
            <button className="text-secondary hover:text-primary transition-colors">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button className="text-secondary hover:text-primary transition-colors">
              <span className="material-symbols-outlined" data-icon="help">help</span>
            </button>
          </div>
          <button className="hidden md:block font-cta-label text-cta-label bg-primary-container text-on-primary px-6 py-3 rounded-full hover:bg-surface-tint transition-colors">
            Mi Cuenta
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow pt-[120px] pb-section-padding px-gutter max-w-container-max mx-auto w-full">
        {/* Progress Bar Section */}
        <div className="w-full max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="font-cta-label text-cta-label text-secondary uppercase tracking-wider text-sm">PASO 1 DE 3 • Búsqueda de Profesional</span>
          </div>
          <div className="flex gap-2 w-full h-2">
            <div className="flex-1 bg-primary-container rounded-full"></div>
            <div className="flex-1 bg-secondary-fixed rounded-full"></div>
            <div className="flex-1 bg-secondary-fixed rounded-full"></div>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-h2-section text-h2-section text-on-surface mb-4">¿A quién estás buscando?</h1>
          <p className="font-body-main text-body-main text-text-secondary">Ingresá el nombre o apellido del profesional para ver su disponibilidad.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-secondary" data-icon="search">search</span>
          </div>
          <input className="w-full pl-12 pr-4 py-4 rounded-xl border border-secondary-fixed bg-surface-container-lowest text-on-surface font-body-main focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors shadow-sm" placeholder="Ej. Dr. Pérez, Especialidad..." type="text"/>
        </div>

        {/* Results Section */}
        <div className="max-w-4xl mx-auto">
          <h2 class="font-h3-subtitle text-h3-subtitle text-on-surface mb-6">Resultados Sugeridos</h2>
          <div className="flex flex-col gap-4">
            {/* Doctor Card 1 */}
            <button className="w-full text-left bg-bg-alternate hover:bg-surface-container transition-colors duration-200 rounded-xl p-6 flex items-center gap-6 group border border-transparent focus:outline-none focus:border-primary-container">
              <img alt="Doctor profile" className="w-16 h-16 rounded-full object-cover shadow-sm" data-alt="A professional headshot of a mature male doctor in a crisp white medical coat, standing in a bright, modern clinic with soft, high-key lighting. The overall aesthetic is clean, corporate, and minimalist, utilizing a color palette of pure whites, soft light grays, and professional tones, aligning perfectly with a high-end healthcare brand identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_-v2wu91ECb4amGT2H4EqL-IltoQWBuu-GizvRlhDy3iNCFrP9Yh6eKto1LIrUhNI9aVlD9laSdWxFH43PQn76uA__Kg3LKHgQZp79cfzHvhnFSoR54EXhq-NjYLogMEttodddpCrbS7INZZS9O_lxHwfnQURmoA_foPcSPejh2ANJsfuVMXQnSvmICJV2ChawzORwrV3fKChGUp0qAb8nvxyQEIz5oH8ptN9YykjN57yPYh5H7KgvtOm0ljPpmJv8VY4sJ4V_WlK"/>
              <div className="flex-grow">
                <h3 className="font-cta-label text-cta-label text-on-surface mb-1">Dr. Martín Rossi</h3>
                <p className="font-body-sm text-body-sm text-tertiary-container mb-1">Cardiología Clínica</p>
                <p className="font-body-sm text-body-sm text-text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]" data-icon="location_on">location_on</span>
                  Centro Médico Barrio Norte
                </p>
              </div>
              <span className="material-symbols-outlined text-secondary group-hover:text-primary-container transition-colors" data-icon="chevron_right">chevron_right</span>
            </button>

            {/* Doctor Card 2 */}
            <button className="w-full text-left bg-bg-alternate hover:bg-surface-container transition-colors duration-200 rounded-xl p-6 flex items-center gap-6 group border border-transparent focus:outline-none focus:border-primary-container">
              <img alt="Doctor profile" className="w-16 h-16 rounded-full object-cover shadow-sm" data-alt="A professional portrait of a female doctor wearing a stethoscope over a light blue scrubs and a white coat, situated in a pristine, well-lit medical facility. The lighting is soft and diffused, creating a welcoming yet authoritative atmosphere. The visual style relies on flat, modern aesthetics with stark whites and subtle gray tonal shifts, reflecting a premium healthcare environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaz3y11AZfGJuzvnhzwa-ExoYW_zAssD93o4MBEcAfXxmt5OyFkKlvgJroXD-QdLM5nADkpvMC7S4qwbuG4jTTkkK27MhW1xcxfqb6ALpapkAM_YMfJI1Te8mqwa6Ff4Zu92s2Ieg4KhW8f6jWP6tDXD0QLKjOwoiVM0xIr_tWjUr9dH_dYvgrxn2NQEYbeB88FQmWfNMYyEmuG_B73a76TCwXtX-slNNRuHM8CJO8NjBuPXndDR2GBaYePsEPQoC3PxD4jQYc4Mof"/>
              <div className="flex-grow">
                <h3 className="font-cta-label text-cta-label text-on-surface mb-1">Dra. Laura Gómez</h3>
                <p className="font-body-sm text-body-sm text-tertiary-container mb-1">Pediatría General</p>
                <p className="font-body-sm text-body-sm text-text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]" data-icon="location_on">location_on</span>
                  Clínica y Maternidad Suizo Argentina
                </p>
              </div>
              <span className="material-symbols-outlined text-secondary group-hover:text-primary-container transition-colors" data-icon="chevron_right">chevron_right</span>
            </button>

            {/* Doctor Card 3 */}
            <button className="w-full text-left bg-bg-alternate hover:bg-surface-container transition-colors duration-200 rounded-xl p-6 flex items-center gap-6 group border border-transparent focus:outline-none focus:border-primary-container">
              <img alt="Doctor profile" className="w-16 h-16 rounded-full object-cover shadow-sm" data-alt="A confident young male medical specialist in a clean, minimalist setting, wearing modern dark blue scrubs. The environment is bathed in bright, neutral daylight, emphasizing a sterile yet approachable modern corporate style. The image avoids heavy shadows, focusing on clarity and high contrast typical of a top-tier medical brand's visual identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhn-Zyy-Ig_u2csot7eLrIao9MVVpbtkq6n1HVf9s_olmT1YLKl21ax8fyEU_Vv16jS0KIm9eHTIL7umrKQSlNJb8BwFgoXnCKbi6FYieP0pcc52tnGrOcRI9a8YskqrrxH1WaWgYEqJctOwueNcOQYB87zJEgFjc6h9Ku0XIHGMh7VaaH406M3uqY-kg23LXqGtC44iZL1pCa9OxpP9tKfS1hVsP3hBrjbJ2_PhbTJ6GKzQGAUIQjcfVjTt7e_MUGQ8oPtfV9c6jd"/>
              <div className="flex-grow">
                <h3 className="font-cta-label text-cta-label text-on-surface mb-1">Dr. Alejandro Silva</h3>
                <p className="font-body-sm text-body-sm text-tertiary-container mb-1">Traumatología</p>
                <p className="font-body-sm text-body-sm text-text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]" data-icon="location_on">location_on</span>
                  Centro Médico Olivos
                </p>
              </div>
              <span className="material-symbols-outlined text-secondary group-hover:text-primary-container transition-colors" data-icon="chevron_right">chevron_right</span>
            </button>
          </div>

          {/* Bottom Action */}
          <div className="mt-12 flex justify-end">
            <button
              disabled
              className="font-cta-label text-cta-label bg-secondary-fixed text-text-secondary px-8 py-4 rounded-full cursor-not-allowed opacity-70 transition-colors"
            >
              Siguiente Paso
            </button>
          </div>
        </div>
      </main>

      {/* Footer (Shared Component) */}
      <footer className="bg-bg-dark dark:bg-on-secondary-fixed text-on-primary dark:text-on-primary font-body-sm text-body-sm w-full py-12 bg-bg-dark flat no shadows">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-gutter max-w-container-max mx-auto">
          <div>
            <div className="font-h3-subtitle text-h3-subtitle text-on-primary mb-4">
              SWISS MEDICAL
            </div>
            <p className="text-secondary-fixed dark:text-secondary-fixed-dim">
              © 2024 Swiss Medical Group. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <a className="text-secondary-fixed dark:text-secondary-fixed-dim hover:text-on-primary transition-colors" href="#">Privacidad</a>
            <a className="text-secondary-fixed dark:text-secondary-fixed-dim hover:text-on-primary transition-colors" href="#">Términos y Condiciones</a>
            <a className="text-secondary-fixed dark:text-secondary-fixed-dim hover:text-on-primary transition-colors" href="#">Defensa del Consumidor</a>
            <a className="text-secondary-fixed dark:text-secondary-fixed-dim hover:text-on-primary transition-colors" href="#">Ética y Cumplimiento</a>
          </div>
        </div>
      </footer>
    </div>
  );
}