import { Alert, Button, Card, Skeleton } from "@heroui/react";
import TurnoAgendadoCard from "./TurnoAgendadoCard";
import { cancelarTurno } from "../../../service/turnosService";
import { useBusqueda } from "../../../context/BusquedaContext"

export default function ProximosTurnosSection({
  loading,
  error,
  upcoming,
  onNuevoTurno,
}) {
  const { busqueda } = useBusqueda();
    const pacienteId = busqueda?.pacienteId;
  return (
    <section>
      <div className="flex justify-between items-end mb-8 border-b border-border pb-4">
        <h2 className="font-sans text-2xl md:text-3xl font-semibold text-surface-foreground">
          Próximos Turnos
        </h2>
        <Button
          variant="ghost"
          className="hover:text-blue-900"
          onPress={onNuevoTurno}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            add_circle
          </span>
          Nuevo Turno
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="flex flex-col md:flex-row gap-6 p-6">
              <Skeleton className="rounded-lg h-20 w-25" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
              <Skeleton className="h-10 w-32 rounded-full" />
            </Card>
          ))}
        </div>
      ) : error ? (
        <Alert color="danger" title="No pudimos cargar tus turnos">
          Verificá tu conexión e intentá nuevamente.
        </Alert>
      ) : upcoming.length === 0 ? (
        <p className="font-sans text-base text-muted">
          No tiene próximos turnos
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {upcoming.map((turno) => (
            <TurnoAgendadoCard 
              key={turno.id} 
              {...turno}
              onCancel={()=> cancelarTurno(turno.id, pacienteId, "")} 
            />
          ))}
        </div>
      )}
    </section>
  );
}
