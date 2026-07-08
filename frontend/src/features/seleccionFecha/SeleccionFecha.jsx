import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBusqueda } from "../../context/BusquedaContext";
import { getPacientes } from "../../service/pacientesService";
import { getTurnos } from "../../service/turnosService";
import ActionButtons from "./components/ActionButtons";
import EmptyState from "./components/EmptyState";
import FechaSection from "./components/FechaSection";
import HeaderSeleccionFecha from "./components/HeaderSeleccionFecha";
import HorarioSection from "./components/HorarioSection";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ResumenTurno from "./components/ResumenTurno";

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

	const tipo = busqueda?.tipo;
	const profesionalId = busqueda?.profesionalId;
	const nombre = busqueda?.nombre;
	const tipoServicio = busqueda?.tipoServicio;
	const busquedaId = busqueda?.id;
	const busquedaPacienteId = busqueda?.pacienteId;

	useEffect(() => {
		const cargar = async () => {
			setCargando(true);
			try {
				const pacientes = await getPacientes();
				if (!pacientes.length) return;
				const id = pacientes[0].id;
				setPacienteId(id);
				if (busquedaPacienteId !== id) {
					actualizarBusqueda({ pacienteId: id });
				}

				const params = {
					idPaciente: id,
					ordenarPor: "fecha",
					direccion: "asc",
					pagina: 1,
					limite: 100,
				};
				if (tipo === "medico" && profesionalId) {
					params.profesional = profesionalId;
				} else if (tipo === "servicio") {
					if (tipoServicio === "ESPECIALIDAD") {
						params.especialidad = nombre;
					} else {
						params.practica = nombre;
					}
				}

				const resultado = await getTurnos(params);
				let lista = resultado.turnos || [];
				if (tipo === "servicio" && busquedaId) {
					lista = lista.filter((t) => t.servicioId === busquedaId);
				}
				setTurnos(lista);
			} finally {
				setCargando(false);
			}
		};
		cargar();
	}, [
		tipo,
		profesionalId,
		nombre,
		tipoServicio,
		busquedaId,
		busquedaPacienteId,
		actualizarBusqueda,
	]);

	const porFecha = agruparPorFecha(turnos);
	const fechas = Object.keys(porFecha).sort();
	const turnosDelDia = fechaSeleccionada
		? (porFecha[fechaSeleccionada] ?? [])
		: [];

	const turnoMap = {};
	turnosDelDia.forEach((tur) => {
		const key = `${tur.id}-${tur.servicioId ?? "sin-servicio"}`;
		turnoMap[key] = tur;
	});

	const selectedTurno =
		selectedTurnoKey.size > 0 ? turnoMap[[...selectedTurnoKey][0]] : null;

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
