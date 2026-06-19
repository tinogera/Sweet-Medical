import React from 'react';

const BusquedasEspecificas = ({ icon, title, description }) => {
  return (
    <>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform" style={{ backgroundColor: '#FFE5E5' }}>
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1", color: '#FF0A0A' }}>
          {icon}
        </span>
      </div>
      <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-3">{title}</h2>
      <p className="font-body-sm text-body-sm text-text-secondary mb-6">{description}</p>
    </>
  );
};

export default BusquedasEspecificas;