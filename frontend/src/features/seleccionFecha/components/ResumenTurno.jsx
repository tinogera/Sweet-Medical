import { Avatar, Card, Link } from "@heroui/react";
import { useNavigate } from "react-router-dom";

function getInitials(label) {
  if (!label) return "?";
  return label
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

export default function ResumenTurno({ busqueda, turnoSeleccionado }) {
  const navigate = useNavigate();
  const tipoLabel = busqueda.tipo === "medico" ? "Médico" : "Servicio";

  return (
    <Card
      data-testid="resumen-turno"
      className="bg-surface-secondary flex-row items-center gap-4 p-4"
    >
      <Avatar size="lg">
        <Avatar.Fallback>{getInitials(busqueda.label)}</Avatar.Fallback>
      </Avatar>
      <div className="flex-1">
        <span className="font-sans text-xs font-bold text-accent uppercase tracking-wide">
          {tipoLabel}
        </span>
        <p className="font-sans text-lg font-semibold text-surface-foreground">
          {busqueda.label}
        </p>
        {turnoSeleccionado && (
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1">
            <span className="flex items-center gap-1 font-sans text-sm text-muted">
              <span
                className="material-symbols-outlined text-base"
                aria-hidden="true"
              >
                medical_services
              </span>
              {turnoSeleccionado.servicio}
            </span>
            <span className="flex items-center gap-1 font-sans text-sm text-muted">
              <span
                className="material-symbols-outlined text-base"
                aria-hidden="true"
              >
                location_on
              </span>
              {turnoSeleccionado.sede}
            </span>
          </div>
        )}
      </div>
      <Link
        href="#"
        onPress={() => navigate(-1)}
        className="text-sm text-accent no-underline"
      >
        Cambiar
        <Link.Icon />
      </Link>
    </Card>
  );
}
