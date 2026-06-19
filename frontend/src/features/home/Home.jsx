import BusquedasEspecificas from "../../components/busquedasEspecificas/BusquedasEspecificas";

export default function Home() {
	return (
		<main className="min-h-screen px-margin-mobile py-8 md:py-section-padding max-w-container-max mx-auto bg-surface">
			{/* Header Section */}
			<div className="mb-8 text-center md:text-left">
				<h1 className="font-h1-hero-mobile md:font-h1-hero text-h1-hero-mobile md:text-h1-hero text-on-surface mb-2">
					Búsqueda de Turnos
				</h1>
				<p className="font-body-main text-body-main text-text-secondary">
					Seleccioná cómo querés buscar tu próximo turno médico.
				</p>
			</div>

			{/* Search Options Cards */}
			<div className="flex flex-col gap-6 md:grid md:grid-cols-2">
				<BusquedasEspecificas
					icon="person_search"
					title="Buscar por Profesional"
					description="Si ya conocés el nombre o apellido del médico que buscás."
					to="/medicos"
				/>
				<BusquedasEspecificas
					icon="medical_services"
					title="Buscar por Especialidad"
					description="Buscá por servicio médico, clínica o centro de atención."
					to="/servicios"
				/>
			</div>

      {/* FIX: refactor en un componente */}
			{/* Quick Access / Recent */}
			<div className="mt-12">
				<h3 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-4">
					Turnos Recientes
				</h3>
				<div className="bg-white border border-outline-variant rounded-lg p-4 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center">
							<span className="material-symbols-outlined text-primary-container text-xl">
								history
							</span>
						</div>
						<div>
							<p className="font-body-main text-body-main font-semibold text-on-surface">
								Dr. Juan Pérez
							</p>
							<p className="font-body-sm text-body-sm text-text-secondary">
								Cardiología - Clínica Suizo Argentina
							</p>
						</div>
					</div>
					<button type="button" className="text-primary-container font-cta-label text-cta-label hidden md:block hover:underline">
						Repetir turno
					</button>
					<button type="button" className="md:hidden text-primary-container p-2">
						<span className="material-symbols-outlined">arrow_forward</span>
					</button>
				</div>
			</div>
		</main>
	);
}
