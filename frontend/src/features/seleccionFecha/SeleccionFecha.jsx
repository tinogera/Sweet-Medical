import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Skeleton, ToggleButtonGroup } from "@heroui/react";
import { getTurnos } from "../../service/turnosService";
import { getPacientes } from "../../service/pacientesService";
import { useBusqueda } from "../../context/BusquedaContext";
import ResumenTurno from "./ResumenTurno";
import FechaCard from "./FechaCard";
import HorarioSlot from "./HorarioSlot";

const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

export function deduplicarHorarios(turnos) {
  const seen = new Set();
  return turnos.filter((tur) => {
    const fecha = new Date(tur.fechaHora);
    const key = `${String(fecha.getHours()).padStart(2, "0")}:${String(fecha.getMinutes()).padStart(2, "0")}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function agruparPorFecha(turnos) {
  return turnos.reduce((acc, tur) => {
    const day = new Date(tur.fechaHora);
    const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(tur);
    return acc;
  }, {});
}

export default function SeleccionFecha() {
  const navigate = useNavigate();
  const { busqueda, setSearchOptions } = useBusqueda();

  const [cargando, setCargando] = useState(true);
  const [turnos, setTurnos] = useState([]);
  const [pacienteId, setPacienteId] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [selectedTurnoKey, setSelectedTurnoKey] = useState(new Set());

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      try {
        const pacientes = await getPacientes();
        if (!pacientes.length) return;
        const id = pacientes[0].id;
        setPacienteId(id);
        setSearchOptions({ pacienteId: id });

        const params = {
          idPaciente: id,
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
    cargar();
  }, []);

  const porFecha = agruparPorFecha(turnos);
  const fechas = Object.keys(porFecha).sort();
  const turnosDelDia = fechaSeleccionada
    ? deduplicarHorarios(porFecha[fechaSeleccionada] ?? [])
    : [];

  const turnoMap = {};
  turnosDelDia.forEach((tur) => {
    const key = `${tur.id}-${tur.servicioId ?? "sin-servicio"}`;
    turnoMap[key] = tur;
  });

  const selectedTurno = selectedTurnoKey.size > 0 ? turnoMap[[...selectedTurnoKey][0]] : null;

  const seleccionarFecha = (key) => {
    setFechaSeleccionada(key);
    setSelectedTurnoKey(new Set());
  };

  const continuar = () => {
    if (fechaSeleccionada) {
      navigate("/turno", { state: { fechaKey: fechaSeleccionada, pacienteId } });
    }
  };

  return (
    <main className="grow py-4 md:py-20 px-4 md:px-6 max-w-300 mx-auto w-full">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="font-sans text-2xl md:text-4xl font-extrabold text-foreground mb-4">
          Seleccioná la Fecha
        </h1>
        <p className="font-sans text-base text-muted">
          Elegí el día y horario que mejor se adapte a tu disponibilidad para
          continuar con la reserva del turno.
        </p>
      </div>

      {/* Summary Card */}
      {busqueda && (
        <div className="mb-8 fade-in">
          <ResumenTurno busqueda={busqueda} />
        </div>
      )}

      {/* Loading */}
      {cargando && (
        <div className="fade-in">
          <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-24 rounded-xl shrink-0" />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {!cargando && fechas.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <span className="material-symbols-outlined text-5xl text-muted">
            calendar_month
          </span>
          <p className="font-sans text-lg font-semibold text-surface-foreground">
            Sin fechas disponibles
          </p>
          <p className="font-sans text-base text-surface-foreground">
            No hay turnos disponibles para este criterio de búsqueda.
          </p>
        </div>
      )}

      {/* Date Cards */}
      {!cargando && fechas.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-sans text-lg font-semibold text-surface-foreground">
              Fechas Disponibles
            </h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
            {fechas.map((key) => {
              const [year, month, day] = key.split("-").map(Number);
              const fecha = new Date(year, month - 1, day);
              return (
                <div
                  key={key}
                  className="snap-start shrink-0 fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <FechaCard
                    fechaKey={key}
                    dayName={DIAS[fecha.getDay()]}
                    dayNumber={day}
                    month={MESES[month - 1]}
                    isSelected={fechaSeleccionada === key}
                    hasTurnos={true}
                    onSelect={seleccionarFecha}
                  />
                </div>
              );
            })}
            {/* Más fechas button */}
            <div
              className="snap-start shrink-0 flex items-center fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                variant="ghost"
                isIconOnly
                onPress={() => {}}
                className="w-24 h-28 rounded-2xl"
                aria-label="Más fechas"
              >
                <span className="material-symbols-outlined text-2xl">add</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Time Slots */}
      {fechaSeleccionada && turnosDelDia.length > 0 && (
        <div className="mb-12">
          <h3 className="font-sans text-lg font-semibold text-surface-foreground mb-6">
            Horarios Disponibles
          </h3>
          <ToggleButtonGroup
            selectionMode="single"
            selectedKeys={selectedTurnoKey}
            onSelectionChange={setSelectedTurnoKey}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            orientation="horizontal"
          >
            {turnosDelDia.map((tur) => {
              const key = `${tur.id}-${tur.servicioId ?? "sin-servicio"}`;
              const hora = new Date(tur.fechaHora).toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
              return (
                <div
                  key={key}
                  className="fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <HorarioSlot
                    turno={tur}
                    turnoKey={key}
                    hora={hora}
                  />
                </div>
              );
            })}
          </ToggleButtonGroup>
        </div>
      )}

      {/* Actions */}
      <div
        className="flex flex-col md:flex-row justify-end items-center gap-4 mt-8 pt-8 border-t border-border fade-in"
        style={{ animationDelay: "0.5s" }}
      >
        <Button
          variant="outline"
          onPress={() => navigate(-1)}
          className="w-full md:w-auto"
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          isDisabled={!selectedTurno}
          onPress={continuar}
          className="w-full md:w-auto"
        >
          Continuar
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        </Button>
      </div>
    </main>
  );
}
