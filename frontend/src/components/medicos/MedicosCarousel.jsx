const Medicos = ({ medicosCargados }) => {
  return (
    <>
      {medicosCargados.map((m) => (
        <button 
          type="button"
          key={m.id || m._id} 
          className="w-full text-left bg-bg-alternate hover:bg-surface-container transition-colors duration-200 rounded-xl p-6 flex items-center gap-6 group border border-transparent focus:outline-none focus:border-primary-container"
        >
          <div className="flex-grow">
            <h3 className="font-cta-label text-cta-label text-on-surface mb-1">
              {m.nombre} {m.apellido}
            </h3>
          </div>
          <span 
            className="material-symbols-outlined text-secondary group-hover:text-primary-container transition-colors" 
            data-icon="chevron_right"
          >
            chevron_right
          </span>
        </button>
      ))}
    </>
  );
};

export default Medicos;