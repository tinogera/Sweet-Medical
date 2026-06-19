const MedicosSearchBar = ({ filtrarMedicos }) => {
  return (
    <div className="relative w-full group">
      <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary-container transition-colors">
        search
      </span>
      <input
        className="w-full h-16 pl-14 pr-6 rounded-full border border-outline-variant bg-surface-lowest text-on-surface font-body-main text-body-main focus:ring-0 focus:border-primary-container transition-colors placeholder:text-secondary-fixed-dim shadow-sm"
        placeholder="Ej. Javier García..."
        type="text"
        onChange={(e) => filtrarMedicos(e.target.value)}
      />
    </div>
  );
};

export default MedicosSearchBar