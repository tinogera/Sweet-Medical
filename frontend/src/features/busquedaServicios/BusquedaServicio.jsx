import { Button, ToggleButtonGroup } from "@heroui/react";
import { useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import ServicioCard from "../../components/servicioCard/ServicioCard";

const services = [
	{ id: "cardiology", icon: "cardiology", label: "Cardiología" },
	{ id: "pediatrics", icon: "pediatrics", label: "Pediatría" },
	{ id: "dermatology", icon: "dermatology", label: "Dermatología" },
	{ id: "laboratory", icon: "biotech", label: "Laboratorio" },
];

export default function BusquedaServicio() {
	const navigate = useNavigate();
  const [seleccionado, setSeleccionado] = useState(null);

  const irAFecha = () => {
    if (!seleccionado) return;
    const state = seleccionado.tipo === 'especialidad'
      ? { tipo: 'servicio', especialidad: seleccionado.valor, label: seleccionado.label }
      : { tipo: 'servicio', practica: seleccionado.valor,    label: seleccionado.label };
    navigate('/fecha', { state });
  };
  
	return (
		<div className="pt-30 pb-20 px-6 max-w-300 mx-auto">
			{/* Title Section */}
			<div className="text-center flex flex-col gap-4">
				<h1 className="font-sans text-[28px] md:text-[40px] font-bold text-surface-foreground">
					¿Qué servicio estás buscando?
				</h1>
				<p className="font-sans text-lg text-muted max-w-150 mx-auto">
					Seleccioná la especialidad médica o el estudio que necesitás.
				</p>
			</div>

			{/* Search Input */}
			<SearchBar
				name="servicio"
				placeholder="Ej. Cardiología, Ecografía, Laboratorio..."
			/>

			{/* Suggested Services Bento */}
			<div className="flex flex-col gap-6">
				<h3 className="font-sans text-base font-bold text-surface-foreground">
					Servicios Sugeridos
				</h3>

				<ToggleButtonGroup
					selectionMode="single"
					size="lg"
					isDetached
					selectedKeys={[selectedService]}
					onSelectionChange={(keys) => setSelectedService([...keys][0])}
					className="grid gap-4 grid-cols-(--auto-columns) w-full"
				>
					{services.map((service) => (
						<ServicioCard
							key={service.id}
							id={service.id}
							icon={service.icon}
							label={service.label}
						/>
					))}
				</ToggleButtonGroup>
			</div>

			{/* Action Area */}
			<div className="mt-8 flex justify-end">
				<Button
					isDisabled={!selectedService}
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
