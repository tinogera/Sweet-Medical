export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <span className="material-symbols-outlined text-5xl text-muted">
        calendar_month
      </span>
      <p className="font-sans text-lg font-semibold text-surface-foreground">
        Sin fechas disponibles
      </p>
      <p className="font-sans text-base text-surface-foreground">
        No hay turnos disponibles para este criterio de búsqueda.
      </p>
    </div>
  );
}
