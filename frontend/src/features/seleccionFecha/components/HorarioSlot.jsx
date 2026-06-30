import { ToggleButton } from "@heroui/react";

export default function HorarioSlot({ turno, turnoKey, hora }) {
  return (
    <ToggleButton
      id={turnoKey}
      className="py-4 px-4 rounded-xl border border-border bg-surface data-[selected=true]:bg-accent/10 data-[selected=true]:border-2 data-[selected=true]:border-accent data-[selected=true]:text-accent font-sans text-base"
      data-testid="horario-slot"
    >
      {hora}
    </ToggleButton>
  );
}
