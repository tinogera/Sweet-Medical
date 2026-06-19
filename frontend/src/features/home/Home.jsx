import BusquedasEspecificas from "../../components/busquedasEspecificas/BusquedasEspecificas";
import TurnoReciente from "../../components/turnoReciente/TurnoReciente";

export default function Home() {
	return (
		<div className="py-4 md:py-20 flex flex-col gap-10 max-w-300 mx-auto">
			{/* Header Section */}
			<div className="mb-10 text-center ">
				<h1 className="font-sans text-4xl md:text-5xl font-extrabold text-surface-foreground mb-2">
					Búsqueda de Turnos
				</h1>
				<p className="font-sans text-lg text-muted">
					Seleccioná cómo querés buscar tu próximo turno médico.
				</p>
			</div>

			{/* Search Options Cards */}
			<div className="flex flex-col gap-6 md:grid md:grid-cols-2 text-pretty">
				<BusquedasEspecificas
					icon="person_search"
					title="Búsqueda por Profesional"
					description="Si ya conocés al profesional o especialista que estás buscando"
					to="/medicos"
					buttonName={"Buscar Profesional"}
				/>
				<BusquedasEspecificas
					icon="medical_services"
					title="Búsqueda por Servicio"
					description="Buscá por especilidad médica, estudio o práctica específica."
					to="/servicios"
					buttonName={"Buscar Servicio"}
				/>
			</div>

      {/* Quick Access / Recent */}
			<div className="flex flex-col gap-2">
				<h3 className="font-sans text-2xl font-semibold text-surface-foreground mb-4">
					Turnos Recientes
				</h3>
				<TurnoReciente
					nombre="Dr. Juan Pérez"
					especialidad="Cardiología - Clínica Suizo Argentina"
				/>
				<TurnoReciente
					nombre="Dr. Juan Pérez"
					especialidad="Cardiología - Clínica Suizo Argentina"
				/>
	
			</div>
		</div>
	);
}
