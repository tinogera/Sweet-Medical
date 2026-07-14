import { ToggleButton } from "@heroui/react";

export default function HorarioSlot({ turno, turnoKey, hora }) {
  return (
    <ToggleButton
      id={turnoKey}
      className="w-full h-auto flex flex-col items-center gap-1 py-4 px-4 rounded-xl border border-border bg-surface data-[selected=true]:bg-accent/10 data-[selected=true]:border-2 data-[selected=true]:border-accent data-[selected=true]:text-accent"
      data-testid="horario-slot"
    >
      <span className="font-sans text-lg font-semibold">{hora}</span>
      <span className="font-sans text-sm text-muted">{turno.servicio}</span>
      <span className="flex items-center gap-1 font-sans text-xs text-muted">
        <span
          className="material-symbols-outlined text-sm leading-none"
          aria-hidden="true"
        >
          location_on
        </span>
        {turno.sede}
      </span>
    </ToggleButton>
  );
}
