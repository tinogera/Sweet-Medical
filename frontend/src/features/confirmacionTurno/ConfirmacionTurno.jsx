import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmarModal from './ConfirmarModal';
import ResumenTurno from '../../components/resumenTurno/ResumenTurno';
import { reservarTurno } from '../../service/turnosService';
import { useBusqueda } from '../../context/BusquedaContext';

export default function ConfirmacionTurno() {
  const navigate = useNavigate();
  const { busqueda } = useBusqueda();
  const turno = busqueda.turno;
  const pacienteId = busqueda.pacienteId;

  const [reservando, setReservando] = useState(false);
  const [error, setError] = useState(null);

  if (!turno || !pacienteId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <span className="material-symbols-outlined text-5xl text-outline-variant">error</span>
        <p className="font-h3-subtitle text-h3-subtitle text-on-surface">No hay turno seleccionado</p>
        <p className="font-body-main text-body-main text-text-secondary">
          Volvé al inicio para buscar un turno.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 px-8 py-3 rounded-full bg-primary-container text-on-primary font-cta-label text-cta-label hover:opacity-90 transition-all"
        >
          Volver al inicio
        </button>
      </div>
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
        e.response?.data?.message || 'Ocurrió un error al reservar el turno. Intentá nuevamente.'
      );
    } finally {
      setReservando(false);
    }
  };

  const fecha = new Date(turno.fechaHora);
  const hora = fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
  const fechaLabel = `${fecha.toLocaleDateString('es-AR')}, ${hora} hs`;

  return (
    <main className="grow py-section-padding px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full max-w-3xl">

      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="font-h1-hero-mobile text-h1-hero-mobile md:font-h1-hero md:text-h1-hero text-on-background mb-4">
          Confirmá tu Turno
        </h1>
        <p className="font-body-main text-body-main text-text-secondary">
          Revisá los datos del turno antes de confirmar la reserva.
        </p>
      </div>

      {/* tarjeta de resumen */}
      <ResumenTurno turno={turno} />

      {/* Mensaje de error */}
      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 font-body-main text-body-main flex items-center gap-3">
          <span className="material-symbols-outlined text-red-600">error</span>
          {error}
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex flex-col md:flex-row justify-end items-center gap-4 pt-8 border-t border-outline-variant">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full md:w-auto px-8 py-4 rounded-full border border-secondary text-secondary font-cta-label text-cta-label hover:bg-bg-alternate transition-colors bg-surface"
        >
          Volver
        </button>
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
