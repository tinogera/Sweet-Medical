import { Button, Skeleton, ToggleButtonGroup } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import ServicioCard from "../../components/servicioCard/ServicioCard";
import { useBusqueda } from "../../context/BusquedaContext";
import { useCargarDatos } from "../../hooks/useCargarDatos";
import { getServicios } from "../../service/busquedaServicioService";

const idDeServicio = (servicio) => servicio.id ?? servicio._id;

const armarBusquedaServicio = (servicio) => {
	return {
		tipo: "servicio",
		id: idDeServicio(servicio),
		nombre: servicio.nombre,
		tipoServicio: servicio.tipoServicio
	};
};

const getServicioIcon = (nombre) => {
	const n = nombre.toLowerCase();
	if (n.includes("cardio")) return "cardiology";
	if (n.includes("pediat")) return "pediatrics";
	if (n.includes("derma")) return "dermatology";
	if (n.includes("sangre") || n.includes("laboratorio")) return "biotech";
	return "medical_services";
};

export default function BusquedaServicio() {
	const navigate = useNavigate();
	const { actualizarBusqueda } = useBusqueda();
	const { datos: servicios, cargando } = useCargarDatos(getServicios);
	const [servicioSeleccionadoId, setServicioSeleccionadoId] = useState();
	const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
	const [busquedaRealizada, setBusquedaRealizada] = useState(false);

	const sinResultados = busquedaRealizada && serviciosFiltrados.length === 0;

	const filtrarServicios = (searchText) => {
		const texto = searchText.toLowerCase();
		const filtered = servicios.filter((servicio) =>
			servicio.nombre.toLowerCase().includes(texto),
		);
		setServiciosFiltrados(filtered);
		setBusquedaRealizada(true);
	};

	const buscarServicioPorId = (id) => {
		return servicios.find((s) => idDeServicio(s) === id);
	};

	const irAFecha = () => {
		const servicio = buscarServicioPorId(servicioSeleccionadoId);
		if (!servicio) return;
		actualizarBusqueda(armarBusquedaServicio(servicio));
		navigate("/fecha");
	};

	const seleccionarServicio = (keys) => setServicioSeleccionadoId([...keys][0]);

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
				<div className="flex flex-col gap-6 fade-in fade-in-delay-100 mb-8">
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
							selectedKeys={[servicioSeleccionadoId]}
							onSelectionChange={seleccionarServicio}
							className="grid gap-4 grid-cols-(--auto-columns) w-full fade-in-stagger"
						>
							{serviciosFiltrados.map((srv) => (
								<div key={idDeServicio(srv)}>
									<ServicioCard
										id={idDeServicio(srv)}
										icon="medical_services"
										label={srv.nombre}
									/>
								</div>
							))}
						</ToggleButtonGroup>
					)}
				</div>
			)}

			<div className="flex flex-col gap-6 fade-in fade-in-delay-150">
				<h3 className="font-sans text-base font-bold text-surface-foreground">
					Servicios Sugeridos
				</h3>

				{cargando ? (
					<div className="grid gap-4 grid-cols-(--auto-columns) w-full">
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className="flex items-center gap-4 w-full p-10 bg-surface border border-border rounded-xl"
							>
								<Skeleton className="w-12 h-12 rounded-full shrink-0" />
								<Skeleton className="h-5 w-2/3 rounded-lg" />
							</div>
						))}
					</div>
				) : (
					<ToggleButtonGroup
						selectionMode="single"
						size="lg"
						isDetached
						selectedKeys={[servicioSeleccionadoId]}
						onSelectionChange={seleccionarServicio}
						className="grid gap-4 grid-cols-(--auto-columns) w-full fade-in-stagger"
					>
						{servicios.slice(0, 4).map((servicio) => (
							<div key={idDeServicio(servicio)}>
								<ServicioCard
									id={idDeServicio(servicio)}
									icon={getServicioIcon(servicio.nombre)}
									label={servicio.nombre}
								/>
							</div>
						))}
					</ToggleButtonGroup>
				)}
			</div>

			<div className="mt-8 flex justify-end fade-in fade-in-delay-300">
				<Button
					isDisabled={!servicioSeleccionadoId}
					variant="primary"
					className="w-full md:w-auto"
					onPress={irAFecha}
				>
					Siguiente Paso
				</Button>
			</div>
		</div>
	);
}
