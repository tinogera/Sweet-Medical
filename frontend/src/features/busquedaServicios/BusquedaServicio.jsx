import { Button, ToggleButtonGroup } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import ServicioCard from "../../components/servicioCard/ServicioCard";
import { useBusqueda } from "../../context/BusquedaContext";

const services = [
	{ id: "cardiology", icon: "cardiology", label: "Cardiología" },
	{ id: "pediatrics", icon: "pediatrics", label: "Pediatría" },
	{ id: "dermatology", icon: "dermatology", label: "Dermatología" },
	{ id: "laboratory", icon: "biotech", label: "Laboratorio" },
];

export default function BusquedaServicio() {
	const navigate = useNavigate();
	const { setSearchOptions } = useBusqueda();
  const [seleccionado, setSeleccionado] = useState(services[0].id);

  const irAFecha = () => {
    if (!seleccionado) return;
    const servicio = services.find((s) => s.id === seleccionado);
    if (!servicio) return;
    setSearchOptions({
      tipo: 'servicio',
      label: servicio.label,
      practica: servicio.id,
    });
    navigate('/fecha');
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
					selectedKeys={[seleccionado]}
					onSelectionChange={(keys) => setSeleccionado([...keys][0])}
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
