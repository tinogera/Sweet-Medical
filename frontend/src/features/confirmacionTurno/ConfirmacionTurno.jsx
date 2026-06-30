import { useState } from "react";
import { Button, Skeleton } from "@heroui/react";
import { useTurnos } from "../../hooks/useTurnos";
import { reservarTurno } from "../../services/turnosService";
import { useBusqueda } from "../../context/BusquedaContext";
import ConfirmarModal from "./ConfirmarModal";

/**
 * Estado único para la operación de reserva (no confundir con fetching de turnos).
 * { fase: 'idle' | 'reservando' | 'success' | 'error', selectedTurno, error, errorType }
 */
const RESERVA_INITIAL = {
  fase: "idle",
  selectedTurno: null,
  error: null,
  errorType: null,
};

export default function ConfirmacionTurno() {
  const { busqueda } = useBusqueda();
  const fechaKey = busqueda?.fechaKey;
  const { data, loading, refetch, error: fetchError } = useTurnos();

  const [reserva, setReserva] = useState(RESERVA_INITIAL);

  const turnos = fechaKey ? data?.turnos ?? [] : [];

  const handleReservar = (turno) => {
    setReserva({ fase: "confirming", selectedTurno: turno, error: null, errorType: null });
  };

  const handleConfirm = async () => {
    if (!reserva.selectedTurno) return;
    setReserva((prev) => ({
      ...prev,
      fase: "reservando",
      error: null,
      errorType: null,
    }));
    try {
      await reservarTurno(
        reserva.selectedTurno.id,
        busqueda?.pacienteId,
        reserva.selectedTurno.servicioId,
      );
      setReserva({ ...RESERVA_INITIAL, fase: "success" });
    } catch (err) {
      const status = err?.response?.status;
      if (status === 409) {
        setReserva((prev) => ({
          ...prev,
          fase: "error",
          error: "Este turno ya no está disponible. Por favor, seleccioná otro horario.",
          errorType: "409",
        }));
      } else {
        setReserva((prev) => ({
          ...prev,
          fase: "error",
          error: "Ocurrió un error al reservar el turno. Intentalo de nuevo.",
          errorType: "other",
        }));
      }
    }
  };

  const handleRefetch = async () => {
    setReserva(RESERVA_INITIAL);
    await refetch();
  };

  const formatFechaLabel = (fechaHora) => {
    if (!fechaHora) return "";
    const fecha = new Date(fechaHora);
    return fecha.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <main className="grow py-4 md:py-20 px-4 md:px-6 max-w-300 mx-auto w-full">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="font-sans text-2xl md:text-4xl font-extrabold text-foreground mb-4">
          Confirmá tu Turno
        </h1>
        <p className="font-sans text-base text-muted">
          Elegí el horario que mejor se adapte a tu disponibilidad.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-xl" />
            ))}
          </div>
        </div>
      )}

      {/* Fetch error */}
      {!loading && fetchError && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <p className="font-sans text-base text-surface-foreground">
            No se pudieron cargar los turnos.
          </p>
          <Button variant="primary" onPress={() => refetch()}>
            Reintentar
          </Button>
        </div>
      )}

      {/* Empty state (no fechaKey or no turnos) */}
      {!loading && !fetchError && turnos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <span className="material-symbols-outlined text-5xl text-muted">
            event_busy
          </span>
          <p className="font-sans text-lg font-semibold text-surface-foreground">
            No hay turnos disponibles para esta fecha.
          </p>
          <p className="font-sans text-base text-surface-foreground">
            Probá seleccionando otra fecha.
          </p>
        </div>
      )}

      {/* Responsive Grid */}
      {!loading && !fetchError && turnos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {turnos.map((tur, index) => {
            const fecha = new Date(tur.fechaHora);
            const hora = fecha.toLocaleTimeString("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
            return (
              <div
                key={tur.id}
                data-testid="turno-card"
                className="fade-in bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow duration-200"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="p-6">
                  {/* Time + Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-sans text-2xl font-bold text-accent">
                        {hora}
                      </span>
                      <span className="font-sans text-sm text-muted">hs</span>
                    </div>
                    <span className="bg-surface-secondary text-muted px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      Disponible
                    </span>
                  </div>

                  {/* Service / Professional / Location */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-muted mt-1 text-[20px]">
                        medical_services
                      </span>
                      <div>
                        <p className="font-sans text-xs text-muted font-semibold">
                          Servicio
                        </p>
                        <p className="font-sans text-sm font-medium text-foreground">
                          {tur.servicio}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-muted mt-1 text-[20px]">
                        person
                      </span>
                      <div>
                        <p className="font-sans text-xs text-muted font-semibold">
                          Profesional
                        </p>
                        <p className="font-sans text-sm font-medium text-foreground">
                          {tur.profesional}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-muted mt-1 text-[20px]">
                        location_on
                      </span>
                      <div>
                        <p className="font-sans text-xs text-muted font-semibold">
                          Sede
                        </p>
                        <p className="font-sans text-sm font-medium text-foreground">
                          {tur.sede}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Reservar Turno button */}
                  <Button
                    className="w-full"
                    variant="primary"
                    onPress={() => handleReservar(tur)}
                  >
                    Reservar Turno
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Confirmar Modal */}
      <ConfirmarModal
        isOpen={reserva.fase !== "idle" && !!reserva.selectedTurno}
        onOpenChange={(open) => {
          if (!open) {
            setReserva(RESERVA_INITIAL);
          }
        }}
        turno={reserva.selectedTurno}
        fechaLabel={reserva.selectedTurno ? formatFechaLabel(reserva.selectedTurno.fechaHora) : ""}
        onConfirm={handleConfirm}
        onRefetch={handleRefetch}
        reservando={reserva.fase === "reservando"}
        error={reserva.error}
        errorType={reserva.errorType}
      />
    </main>
  );
}
