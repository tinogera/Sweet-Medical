import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Surface, Typography } from "@heroui/react";
import ConfirmarModal from "./ConfirmarModal";
import ResumenTurno from "../../components/resumenTurno/ResumenTurno";
import { reservarTurno } from "../../service/turnosService";
import { useBusqueda } from "../../context/BusquedaContext";

export default function ConfirmacionTurno() {
  const navigate = useNavigate();
  const { busqueda } = useBusqueda();
  const turno = busqueda.turno;
  const pacienteId = busqueda.pacienteId;

  const [reservando, setReservando] = useState(false);
  const [error, setError] = useState(null);

  if (!turno || !pacienteId) {
    return (
      <Surface className="flex flex-col items-center justify-center py-20 gap-4 text-center mx-auto my-20 max-w-md">
        <span className="material-symbols-outlined text-5xl text-muted">
          error
        </span>
        <Typography type="h3">No hay turno seleccionado</Typography>
        <Typography type="body" color="muted">
          Volvé al inicio para buscar un turno.
        </Typography>
        <Button variant="primary" onPress={() => navigate("/")} className="mt-2">
          Volver al inicio
        </Button>
      </Surface>
    );
  }

  const handleConfirmar = async () => {
    setReservando(true);
    setError(null);
    try {
      await reservarTurno(turno.id, pacienteId, turno.servicioId);
      navigate(`/mis-turnos/${pacienteId}`);
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Ocurrió un error al reservar el turno. Intentá nuevamente."
      );
    } finally {
      setReservando(false);
    }
  };

  const fecha = new Date(turno.fechaHora);
  const hora = fecha.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const fechaLabel = `${fecha.toLocaleDateString("es-AR")}, ${hora} hs`;

  return (
    <main className="grow py-4 md:py-20 px-4 md:px-6 mx-auto w-full max-w-3xl">
      <div className="mb-12 text-center md:text-left">
        <Typography type="h1" className="mb-4">
          Confirmá tu Turno
        </Typography>
        <Typography type="body" color="muted">
          Revisá los datos del turno antes de confirmar la reserva.
        </Typography>
      </div>

      <ResumenTurno turno={turno} />

      {error && (
        <div className="mb-8">
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Error al reservar</Alert.Title>
              <Alert.Description>{error}</Alert.Description>
            </Alert.Content>
          </Alert>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-end items-center gap-4 pt-8 border-t border-border">
        <Button variant="outline" onPress={() => navigate(-1)} className="w-full md:w-auto">
          Volver
        </Button>
        <ConfirmarModal
          profesional={turno.profesional}
          servicio={turno.servicio}
          fechaLabel={fechaLabel}
          onConfirm={handleConfirmar}
          reservando={reservando}
        />
      </div>
    </main>
  );
}
