import { Button, ToggleButtonGroup } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import ServicioCard from "../../components/servicioCard/ServicioCard";
import { useBusqueda } from "../../context/BusquedaContext";
import { useCargarDatos } from "../../hooks/useCargarDatos";
import { getServicios } from "../../service/busquedaServicioService";

const TIPO_ESPECIALIDAD = "ESPECIALIDAD";
const TIPO_PRACTICA = "PRACTICA";

// Accesos rápidos con la misma forma que los servicios que devuelve la API
const serviciosSugeridos = [
	{ id: "sugerido-cardiologia", icon: "cardiology", nombre: "Cardiología", tipoServicio: TIPO_ESPECIALIDAD },
	{ id: "sugerido-pediatria", icon: "pediatrics", nombre: "Pediatría", tipoServicio: TIPO_ESPECIALIDAD },
	{ id: "sugerido-dermatologia", icon: "dermatology", nombre: "Dermatología", tipoServicio: TIPO_ESPECIALIDAD },
	{ id: "sugerido-laboratorio", icon: "biotech", nombre: "Laboratorio", tipoServicio: TIPO_PRACTICA },
];

const idDeServicio = (servicio) => servicio.id ?? servicio._id;

const armarBusquedaServicio = (servicio) => {
	const esEspecialidad = servicio.tipoServicio === TIPO_ESPECIALIDAD;
	return {
		tipo: "servicio",
		label: servicio.nombre,
		especialidad: esEspecialidad ? servicio.nombre : null,
		practica: esEspecialidad ? null : servicio.nombre,
	};
};

export default function BusquedaServicio() {
	const navigate = useNavigate();
	const { actualizarBusqueda } = useBusqueda();
	const { datos: servicios } = useCargarDatos(getServicios);
	const [servicioSeleccionadoId, setServicioSeleccionadoId] = useState(serviciosSugeridos[0].id);
	const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
	const [busquedaRealizada, setBusquedaRealizada] = useState(false);

	const sinResultados = busquedaRealizada && serviciosFiltrados.length === 0;

	const filtrarServicios = (searchText) => {
		const texto = searchText.toLowerCase();
		const filtered = servicios.filter((servicio) =>
			servicio.nombre.toLowerCase().includes(texto)
		);
		setServiciosFiltrados(filtered);
		setBusquedaRealizada(true);
	};

	const buscarServicioPorId = (id) =>
		[...serviciosSugeridos, ...servicios].find((s) => idDeServicio(s) === id);

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

				<ToggleButtonGroup
					selectionMode="single"
					size="lg"
					isDetached
					selectedKeys={[servicioSeleccionadoId]}
					onSelectionChange={seleccionarServicio}
					className="grid gap-4 grid-cols-(--auto-columns) w-full fade-in-stagger"
				>
					{serviciosSugeridos.map((servicio) => (
						<div key={servicio.id}>
							<ServicioCard
								id={servicio.id}
								icon={servicio.icon}
								label={servicio.nombre}
							/>
						</div>
					))}
				</ToggleButtonGroup>
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
