import { Button } from "@heroui/react";
import FechaCard from "./FechaCard";

const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

export default function FechaSection({ fechas, fechaSeleccionada, onSelect }) {
  return (
    <div className="mb-12">
      <h3 className="font-sans text-lg font-semibold text-surface-foreground mb-6">
        Fechas Disponibles
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
        {fechas.map((key) => {
          const [year, month, day] = key.split("-").map(Number);
          const fecha = new Date(year, month - 1, day);
          return (
            <div
              key={key}
              className="snap-start shrink-0 fade-in fade-in-delay-200"
            >
              <FechaCard
                fechaKey={key}
                dayName={DIAS[fecha.getDay()]}
                dayNumber={day}
                month={MESES[month - 1]}
                isSelected={fechaSeleccionada === key}
                hasTurnos={true}
                onSelect={onSelect}
              />
            </div>
          );
        })}
        <div className="snap-start shrink-0 flex items-center fade-in fade-in-delay-200">
          <Button
            variant="ghost"
            isIconOnly
            onPress={() => {}}
            className="w-24 h-28 rounded-2xl"
            aria-label="Ver más fechas"
          >
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
