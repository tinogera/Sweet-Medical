const Medicos = ({}) =>{
            return(<button className="w-full text-left bg-bg-alternate hover:bg-surface-container transition-colors duration-200 rounded-xl p-6 flex items-center gap-6 group border border-transparent focus:outline-none focus:border-primary-container">
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
            )}

export default Medicos;