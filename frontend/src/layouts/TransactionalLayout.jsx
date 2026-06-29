import { Button } from "@heroui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/logo/Logo";
import PiePagina from "../components/piePagina/PiePagina";
import ProgressIndicator from "../components/progressIndicator/ProgressIndicator";

const MAPA_PASOS = {
  "/medicos":   { paso: 1, label: "Búsqueda de Profesional" },
  "/servicios": { paso: 1, label: "Búsqueda de Servicio" },
  "/fecha":     { paso: 2, label: "Selección de Fecha" },
  "/turno":     { paso: 3, label: "Confirmación de Turno" },
};

export default function TransactionalLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	const progreso = MAPA_PASOS[location.pathname] ?? { paso: 1, label: "Búsqueda" };

	return (
		<>
			<header className="full-width top-0 sticky bg-surface border-b shadow-xs border-border z-50 transition duration-200 ease-in-out">
				<div className="grid grid-cols-2 items-center h-20 px-6 max-w-300 mx-auto ">
					<nav className="flex items-center gap-4">
						<Button
							type="button"
							isIconOnly
							variant="ghost"
							className="text-muted hover:text-accent hover:bg-surface-secondary"
							onClick={() => {
								navigate(-1);
							}}
						>
							<span
								className="material-symbols-outlined"
								data-icon="arrow_back"
							>
								arrow_back
							</span>
						</Button>
						<Logo className="size-10" />
					</nav>

					<ProgressIndicator
						step={progreso.paso}
						totalSteps={3}
						label={progreso.label}
					/>
				</div>
			</header>

			<main className="grow">
				<Outlet />
			</main>
			<PiePagina />
		</>
	);
}
