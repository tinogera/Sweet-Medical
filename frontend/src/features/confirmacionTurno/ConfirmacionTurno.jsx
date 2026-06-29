import { useState, useEffect } from "react";
import { Button, Skeleton } from "@heroui/react";
import { getTurnos } from "../../service/turnosService";
import { useBusqueda } from "../../context/BusquedaContext";
import ConfirmarModal from "./ConfirmarModal";

export default function ConfirmacionTurno() {
  const { busqueda } = useBusqueda();
  const fechaKey = busqueda?.fechaKey;

  const [cargando, setCargando] = useState(true);
  const [turnos, setTurnos] = useState([]);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [reservando, setReservando] = useState(false);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);

  const fetchTurnos = async () => {
    setCargando(true);
    try {
      const params = {
        fecha: fechaKey,
        idPaciente: busqueda?.pacienteId,
        ordenarPor: "fecha",
        direccion: "asc",
        pagina: 1,
        limite: 100,
      };
      if (busqueda?.tipo === "medico" && busqueda.profesionalId) {
        params.profesional = busqueda.profesionalId;
      } else if (busqueda?.tipo === "servicio") {
        if (busqueda.especialidad) params.especialidad = busqueda.especialidad;
        if (busqueda.practica) params.practica = busqueda.practica;
      }

      const resultado = await getTurnos(params);
      setTurnos(resultado.turnos || []);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (fechaKey) {
      fetchTurnos();
    } else {
      setCargando(false);
    }
  }, [fechaKey, busqueda]);

  const handleReservar = (turno) => {
    setSelectedTurno(turno);
    setError(null);
    setErrorType(null);
  };

  const handleConfirm = async () => {
    if (!selectedTurno) return;
    setReservando(true);
    setError(null);
    try {
      const { reservarTurno } = await import("../../service/turnosService");
      await reservarTurno(
        selectedTurno.id,
        busqueda?.pacienteId,
        selectedTurno.servicioId,
      );
      setSelectedTurno(null);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 409) {
        setError("Este turno ya no está disponible. Por favor, seleccioná otro horario.");
        setErrorType("409");
      } else {
        setError("Ocurrió un error al reservar el turno. Intentalo de nuevo.");
        setErrorType("other");
      }
    } finally {
      setReservando(false);
    }
  };

  const handleRefetch = async () => {
    setSelectedTurno(null);
    setError(null);
    setErrorType(null);
    await fetchTurnos();
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
      {cargando && (
        <div className="fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-xl" />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!cargando && turnos.length === 0 && (
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
      {!cargando && turnos.length > 0 && (
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
        isOpen={!!selectedTurno}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTurno(null);
            setError(null);
            setErrorType(null);
          }
        }}
        turno={selectedTurno}
        fechaLabel={selectedTurno ? formatFechaLabel(selectedTurno.fechaHora) : ""}
        onConfirm={handleConfirm}
        onRefetch={handleRefetch}
        reservando={reservando}
        error={error}
        errorType={errorType}
      />
    </main>
  );
}
