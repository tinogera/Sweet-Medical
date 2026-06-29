import { useNavigate } from 'react-router-dom';
import { useBusqueda } from '../../context/BusquedaContext';

const Medicos = ({ medicosCargados }) => {
  const navigate = useNavigate();
  const { setSearchOptions } = useBusqueda();

  return (
    <>
      {medicosCargados.map((m) => (
        <button
          type="button"
          key={m.id || m._id}
          onClick={() => {
            setSearchOptions({
              tipo: 'medico',
              label: `${m.nombre} ${m.apellido}`,
              profesionalId: m.id || m._id,
            });
            navigate('/fecha');
          }}
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