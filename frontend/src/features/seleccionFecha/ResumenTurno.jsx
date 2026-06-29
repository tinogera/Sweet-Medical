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

export default function ResumenTurno({ busqueda }) {
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
