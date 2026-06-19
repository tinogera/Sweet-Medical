import { Skeleton } from "../skeleton/skeleton";

// Fila de carga armada con <Skeleton/> (igual que los ejemplos de shadcn).
const SkeletonRow = () => (
  <div className="w-full bg-bg-alternate rounded-xl p-6 flex items-center gap-6">
    <div className="flex-grow space-y-2">
      <Skeleton className="h-4 w-2/5" />
      <Skeleton className="h-3 w-3/5" />
    </div>
    <Skeleton className="h-6 w-6 rounded-full" />
  </div>
);

const Medicos = ({ medicosCargados, loading }) => {
  if (loading) {
    return (
      <>
        {[1, 2, 3, 4].map((i) => (
          <SkeletonRow key={i} />
        ))}
      </>
    );
  }
  if (!medicosCargados || medicosCargados.length === 0) {
    return (
      <div className="border border-dashed border-outline-variant rounded-xl p-12 text-center bg-surface-container-low">
        <span className="material-symbols-outlined text-4xl text-secondary-fixed-dim">person_off</span>
        <p className="font-body-main text-body-main text-on-surface mt-3 font-semibold">
          No encontramos médicos
        </p>
        <p className="font-body-sm text-body-sm text-text-secondary mt-1">
          Probá con otro nombre o apellido.
        </p>
      </div>
    );
  }
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