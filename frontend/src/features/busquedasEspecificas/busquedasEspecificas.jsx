import React from 'react';

const BusquedasEspecificas = ({ icon, title, description }) => {
  return (
    <div className="relative overflow-hidden h-full bg-surface border-[1.5px] border-primary rounded-2xl p-8 shadow-sm transition-all duration-200 group-hover:-translate-y-1.5 group-hover:shadow-xl group-focus:shadow-[0_0_0_4px_rgba(226,0,26,0.18)]">

      <span className="inline-flex w-16 h-16 rounded-2xl bg-primary-container items-center justify-center mb-6 shadow-md">
        <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      </span>

      <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-2.5">{title}</h2>
      <p className="font-body-main text-body-main text-text-secondary">{description}</p>

      <span className="mt-5 inline-flex items-center gap-1.5 font-cta-label text-primary font-bold">
        Empezar
        <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
      </span>
    </div>
  );
};

export default BusquedasEspecificas;