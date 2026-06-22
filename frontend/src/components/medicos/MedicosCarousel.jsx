import { useNavigate } from 'react-router-dom';

const Medicos = ({ medicosCargados }) => {
  const navigate = useNavigate();

  return (
    <>
      {medicosCargados.map((m) => (
        <button
          type="button"
          key={m.id || m._id}
          onClick={() => navigate('/fecha', { state: { tipo: 'medico', profesional: m.id || m._id, label: `${m.nombre} ${m.apellido}` } })}
          className="w-full text-left bg-bg-alternate hover:bg-surface-container transition-colors duration-200 rounded-xl p-6 flex items-center gap-6 group border border-transparent focus:outline-none focus:border-primary-container"
        >
          <div className="grow">
            <h3 className="font-sans text-base font-bold text-surface-foreground mb-1">
              {m.nombre} {m.apellido}
            </h3>
          </div>
          <span
            className="material-symbols-outlined text-muted group-hover:text-accent transition-colors"
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