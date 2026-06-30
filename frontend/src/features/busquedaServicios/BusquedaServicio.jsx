import { Button, ToggleButtonGroup } from "@heroui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import ServicioCard from "../../components/servicioCard/ServicioCard";
import { useBusqueda } from "../../context/BusquedaContext";
import { getServicios } from "../../service/busquedaServicioService";

const services = [
	{ id: "cardiology", icon: "cardiology", label: "Cardiología", tipo: "especialidad", query: "cardiología" },
	{ id: "pediatrics", icon: "pediatrics", label: "Pediatría", tipo: "especialidad", query: "pediatría" },
	{ id: "dermatology", icon: "dermatology", label: "Dermatología", tipo: "especialidad", query: "dermatología" },
	{ id: "laboratory", icon: "biotech", label: "Laboratorio", tipo: "practica", query: "laboratorio" },
];

export default function BusquedaServicio() {
	const navigate = useNavigate();
	const { setSearchOptions } = useBusqueda();
	const [seleccionado, setSeleccionado] = useState(services[0].label);
	const [servicios, setServicios] = useState([]);
	const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
	const [busquedaRealizada, setBusquedaRealizada] = useState(false);
	const [cargando, setCargando] = useState(true);

	const sinResultados = busquedaRealizada && serviciosFiltrados.length === 0;

	useEffect(() => {
		const cargarServicios = async () => {
			setCargando(true);
			const data = await getServicios();
			if (data) {
				setServicios(data);
			}
			setCargando(false);
		};
		cargarServicios();
	}, []);

	const filtrarServicios = (searchText) => {
		const texto = searchText.toLowerCase();
		const filtered = servicios.filter((servicio) =>
			servicio.nombre.toLowerCase().includes(texto)
		);
		setServiciosFiltrados(filtered);
		setBusquedaRealizada(true);
	};

	const irAFecha = () => {
		if (!seleccionado) return;
		const servicio = [...services, ...servicios].find(
			(s) => s.label === seleccionado || s.nombre === seleccionado
		);
		if (!servicio) return;

		const esEspecialidad =
			servicio.tipo === "especialidad" ||
			servicio.tipoServicio?.toUpperCase() === "ESPECIALIDAD";
		const esPractica =
			servicio.tipo === "practica" ||
			servicio.tipoServicio?.toUpperCase() === "PRACTICA";
		const queryVal = servicio.query || servicio.nombre;
		const nombreLabel = servicio.label || servicio.nombre;

		const searchData = {
			tipo: "servicio",
			label: nombreLabel,
			especialidad: esEspecialidad ? queryVal : null,
			practica: esPractica ? queryVal : null,
		};

		setSearchOptions(searchData);
		navigate("/fecha");
	};

	return (
		<div className="pt-30 pb-20 px-6 max-w-300 mx-auto">
			<div className="text-center flex flex-col gap-4 fade-in">
				<h1 className="font-sans text-[28px] md:text-[40px] font-bold text-surface-foreground">
					¿Qué servicio estás buscando?
				</h1>
				<p className="font-sans text-lg text-muted max-w-150 mx-auto">
					Seleccioná la especialidad médica o el estudio que necesitás.
				</p>
			</div>

			<SearchBar
				name="servicio"
				placeholder="Ej. Cardiología, Ecografía, Laboratorio..."
				onSearch={filtrarServicios}
				showButton={true}
			/>

			{busquedaRealizada && (
				<div className="flex flex-col gap-6 fade-in mb-8" style={{ animationDelay: "0.1s" }}>
					<h3 className="font-sans text-base font-bold text-surface-foreground">
						Resultados de la búsqueda
					</h3>
					{sinResultados ? (
						<p className="font-sans text-muted">No se encontraron servicios.</p>
					) : (
						<ToggleButtonGroup
							selectionMode="single"
							size="lg"
							isDetached
							selectedKeys={[seleccionado]}
							onSelectionChange={(keys) => setSeleccionado([...keys][0])}
							className="grid gap-4 grid-cols-(--auto-columns) w-full"
						>
							{serviciosFiltrados.map((srv, i) => (
								<div
									key={srv.nombre}
									className="fade-in"
									style={{ animationDelay: `${0.1 + i * 0.08}s` }}
								>
									<ServicioCard
										id={srv.nombre}
										icon="medical_services"
										label={srv.nombre}
									/>
								</div>
							))}
						</ToggleButtonGroup>
					)}
				</div>
			)}

			<div className="flex flex-col gap-6 fade-in" style={{ animationDelay: "0.15s" }}>
				<h3 className="font-sans text-base font-bold text-surface-foreground">
					Servicios Sugeridos
				</h3>

				<ToggleButtonGroup
					selectionMode="single"
					size="lg"
					isDetached
					selectedKeys={[seleccionado]}
					onSelectionChange={(keys) => setSeleccionado([...keys][0])}
					className="grid gap-4 grid-cols-(--auto-columns) w-full"
				>
					{services.map((service, i) => (
						<div
							key={service.id}
							className="fade-in"
							style={{ animationDelay: `${0.15 + i * 0.08}s` }}
						>
							<ServicioCard
								id={service.label}
								icon={service.icon}
								label={service.label}
							/>
						</div>
					))}
				</ToggleButtonGroup>
			</div>

			<div className="mt-8 flex justify-end fade-in" style={{ animationDelay: "0.3s" }}>
				<Button
					isDisabled={!seleccionado}
					variant="secondary"
					className="w-full md:w-auto"
					onClick={irAFecha}
					disabled={!seleccionado}
				>
					Siguiente Paso
				</Button>
			</div>
		</div>
	);
}
