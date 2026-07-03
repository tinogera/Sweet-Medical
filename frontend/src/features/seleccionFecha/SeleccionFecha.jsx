import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTurnos } from "../../service/turnosService";
import { getPacientes } from "../../service/pacientesService";
import { useBusqueda } from "../../context/BusquedaContext";
import ResumenTurno from "./components/ResumenTurno";
import HeaderSeleccionFecha from "./components/HeaderSeleccionFecha";
import LoadingSkeleton from "./components/LoadingSkeleton";
import EmptyState from "./components/EmptyState";
import FechaSection from "./components/FechaSection";
import HorarioSection from "./components/HorarioSection";
import ActionButtons from "./components/ActionButtons";

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
  const { busqueda, actualizarBusqueda } = useBusqueda();

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
        actualizarBusqueda({ pacienteId: id });

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
  const turnosDelDia = fechaSeleccionada ? porFecha[fechaSeleccionada] ?? [] : [];

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
    if (selectedTurno) {
      actualizarBusqueda({ turno: selectedTurno, pacienteId });
      navigate("/turno");
    }
  };

  return (
    <main className="grow py-4 md:py-20 px-4 md:px-6 max-w-300 mx-auto w-full">
      <HeaderSeleccionFecha />

      {busqueda && (
        <div className="mb-8 fade-in">
          <ResumenTurno busqueda={busqueda} turnoSeleccionado={selectedTurno} />
        </div>
      )}

      {cargando && <LoadingSkeleton />}

      {!cargando && fechas.length === 0 && <EmptyState />}

      {!cargando && fechas.length > 0 && (
        <FechaSection
          fechas={fechas}
          fechaSeleccionada={fechaSeleccionada}
          onSelect={seleccionarFecha}
        />
      )}

      {fechaSeleccionada && turnosDelDia.length > 0 && (
        <HorarioSection
          turnos={turnosDelDia}
          selectedKeys={selectedTurnoKey}
          onSelectionChange={setSelectedTurnoKey}
        />
      )}

      <ActionButtons
        onContinue={continuar}
        isContinueDisabled={!selectedTurno}
        onCancel={() => navigate(-1)}
      />
    </main>
  );
}
