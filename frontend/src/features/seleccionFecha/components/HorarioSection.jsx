import { ToggleButtonGroup } from "@heroui/react";
import HorarioSlot from "./HorarioSlot";

export default function HorarioSection({
  turnos,
  selectedKeys,
  onSelectionChange,
}) {
  return (
    <div className="mb-12">
      <h3 className="font-sans text-lg font-semibold text-surface-foreground mb-6">
        Horarios Disponibles
      </h3>
      <ToggleButtonGroup
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
        orientation="horizontal"
      >
        {turnos.map((tur) => {
          const key = `${tur.id}-${tur.servicioId ?? "sin-servicio"}`;
          const hora = new Date(tur.fechaHora).toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          return (
            <div key={key} className="fade-in fade-in-delay-300">
              <HorarioSlot turno={tur} turnoKey={key} hora={hora} />
            </div>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
}
