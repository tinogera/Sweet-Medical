import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTurnos } from '../../service/turnosService';
import { getPacientes } from '../../service/pacientesService';

const DIAS  = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

function agruparPorFecha(turnos) {
  return turnos.reduce((acc, tur) => {
    const day = new Date(tur.fechaHora);
    const key = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(tur);
    return acc;
  }, {});
}

export default function SeleccionFecha() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const busqueda  = location.state;

  const [cargando,         setCargando]         = useState(true);
  const [turnos,           setTurnos]           = useState([]);
  const [pacienteId,       setPacienteId]       = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      try {
        const pacientes = await getPacientes();
        if (!pacientes.length) return;
        const id = pacientes[0].id;
        setPacienteId(id);

        const params = { idPaciente: id, ordenarPor: 'fecha', direccion: 'asc', pagina: 1, limite: 100 };
        if (busqueda?.tipo === 'medico' && busqueda.profesional) {
          params.profesional = busqueda.profesional;
        } else if (busqueda?.tipo === 'servicio') {
          if (busqueda.especialidad) params.especialidad = busqueda.especialidad;
          if (busqueda.practica)     params.practica     = busqueda.practica;
        }

        const resultado = await getTurnos(params);
        setTurnos(resultado.turnos || []);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const porFecha     = agruparPorFecha(turnos);
  const fechas       = Object.keys(porFecha).sort();
  const turnosDelDia = fechaSeleccionada ? (porFecha[fechaSeleccionada] ?? []) : [];

  const seleccionarFecha = (key) => {
    setFechaSeleccionada(key);
    setTurnoSeleccionado(null);
  };

  const continuar = () => {
    navigate('/turno', { state: { turno: turnoSeleccionado, pacienteId } });
  };

  return (
    <main className="flex-grow py-section-padding px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full max-w-3xl">

      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="font-h1-hero-mobile text-h1-hero-mobile md:font-h1-hero md:text-h1-hero text-on-background mb-4">
          Seleccioná la Fecha
        </h1>
        <p className="font-body-main text-body-main text-text-secondary">
          Elegí el día y horario que mejor se adapte a tu disponibilidad para continuar con la reserva del turno.
        </p>
      </div>

      {/* Summary Card */}
      {busqueda && (
        <div className="bg-surface rounded-xl p-6 mb-12 flex items-center gap-6 relative border border-outline-variant shadow-sm">
          <div className="w-14 h-14 rounded-full bg-surface-container-high flex-shrink-0 flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-3xl">
              {busqueda.tipo === 'medico' ? 'person' : 'medical_services'}
            </span>
          </div>
          <div>
            <span className="font-body-sm text-body-sm text-primary uppercase font-bold tracking-wide mb-1 block">
              {busqueda.tipo === 'medico' ? 'Médico' : 'Servicio'}
            </span>
            <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface">{busqueda.label}</h2>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 right-6 text-primary font-body-sm text-body-sm underline hover:opacity-80 transition-opacity"
          >
            Cambiar
          </button>
        </div>
      )}

      {/* Loading */}
      {cargando && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-12 h-12 border-4 border-outline-variant border-t-primary rounded-full animate-spin"></div>
          <p className="font-body-main text-text-secondary animate-pulse">Buscando fechas disponibles...</p>
        </div>
      )}

      {/* No results */}
      {!cargando && fechas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <span className="material-symbols-outlined text-5xl text-outline-variant">calendar_month</span>
          <p className="font-h3-subtitle text-h3-subtitle text-on-surface">Sin fechas disponibles</p>
          <p className="font-body-main text-body-main text-text-secondary">
            No hay turnos disponibles para este criterio de búsqueda.
          </p>
        </div>
      )}

      {/* Date Cards */}
      {!cargando && fechas.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-h3-subtitle text-h3-subtitle text-on-surface">Fechas Disponibles</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
            {fechas.map((key) => {
              const [year, month, day] = key.split('-').map(Number);
              const fecha      = new Date(year, month - 1, day);
              const isSelected = fechaSeleccionada === key;
              return (
                <button
                  key={key}
                  onClick={() => seleccionarFecha(key)}
                  className={`snap-start flex-shrink-0 w-24 h-28 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isSelected
                      ? 'border-2 border-primary bg-surface-container shadow-[0_0_0_4px_rgba(226,0,26,0.1)]'
                      : 'border-outline-variant bg-surface hover:bg-bg-alternate shadow-sm'
                  }`}
                >
                  <span className={`font-body-sm text-body-sm uppercase mb-1 ${isSelected ? 'text-primary font-bold' : 'text-text-secondary'}`}>
                    {DIAS[fecha.getDay()]}
                  </span>
                  <span className={`font-h3-subtitle text-h3-subtitle ${isSelected ? 'text-primary font-bold' : 'text-on-surface'}`}>
                    {day}
                  </span>
                  <span className={`font-body-sm text-body-sm ${isSelected ? 'text-primary' : 'text-text-secondary'}`}>
                    {MESES[month - 1]}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Time Slots */}
      {fechaSeleccionada && turnosDelDia.length > 0 && (
        <div className="mb-12">
          <h3 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-6">
            Horarios Disponibles
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {turnosDelDia.map((tur) => {
              const hora       = new Date(tur.fechaHora).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
              const isSelected = turnoSeleccionado?.id === tur.id && turnoSeleccionado?.servicioId === tur.servicioId;
              return (
                <button
                  key={`${tur.id}-${tur.servicioId ?? 'sin-servicio'}`}
                  onClick={() => setTurnoSeleccionado(tur)}
                  className={`py-4 px-4 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    isSelected
                      ? 'border-2 border-primary bg-surface-container shadow-[0_0_0_4px_rgba(226,0,26,0.1)] text-primary'
                      : 'border-outline-variant bg-surface hover:bg-bg-alternate shadow-sm text-on-surface'
                  }`}
                >
                  <span className={`font-h3-subtitle text-h3-subtitle ${isSelected ? 'text-primary font-bold' : ''}`}>
                    {hora}
                  </span>
                  {tur.servicio && (
                    <span className={`font-body-main text-body-main text-center leading-tight ${isSelected ? 'text-primary font-semibold' : 'text-on-surface'}`}>{tur.servicio}</span>
                  )}
                  <span className="font-body-sm text-body-sm text-text-secondary">Doc. {tur.profesional}</span>
                  <span className="font-body-sm text-body-sm text-text-secondary">{tur.sede}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col md:flex-row justify-end items-center gap-4 mt-8 pt-8 border-t border-outline-variant">
        <button
          onClick={() => navigate(-1)}
          className="w-full md:w-auto px-8 py-4 rounded-full border border-secondary text-secondary font-cta-label text-cta-label hover:bg-bg-alternate transition-colors bg-surface"
        >
          Cancelar
        </button>
        <button
          onClick={continuar}
          disabled={!turnoSeleccionado}
          className={`w-full md:w-auto px-10 py-4 rounded-full font-cta-label text-cta-label flex items-center justify-center gap-2 transition-all ${
            turnoSeleccionado
              ? 'bg-primary-container text-on-primary hover:opacity-90 shadow-sm'
              : 'bg-secondary-container text-secondary cursor-not-allowed'
          }`}
        >
          Continuar
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </main>
  );
}
