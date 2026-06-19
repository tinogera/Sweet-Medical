import { Button } from "@heroui/react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/logo/Logo";
import PiePagina from "../components/piePagina/PiePagina";
import ProgressIndicator from "../components/progressIndicator/ProgressIndicator";

export default function TransactionalLayout() {
	const navigate = useNavigate();
	return (
		<>
			{/* Header / TopNavBar (Simplified for transactional flow - Navigation suppressed as per rules) */}
			<header className="full-width top-0 sticky bg-surface border-b shadow-xs border-border z-50 transition duration-200 ease-in-out">
				<div className="grid grid-cols-2 items-center h-20 px-6 max-w-300 mx-auto ">
					<nav className="flex items-center gap-4">
						{/* Back Button for Transactional Flow */}
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

					{/* Wizard Progress Indicator */}
					<ProgressIndicator
						step={1}
						totalSteps={3}
						label="Búsqueda de Profesional"
						className="mb-12"
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
