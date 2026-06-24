import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import {
	upcomingTurnos as defaultUpcomingTurnos,
	pastTurnos,
} from "./mockTurnos";
import TurnoAgendadoCard from "./TurnoAgendadoCard";
import TurnosPasados from "./TurnosPasados";

export default function MisTurnos({ upcomingTurnos = defaultUpcomingTurnos }) {
	const navigate = useNavigate();

	return (
		<div className="py-4 md:py-20 flex flex-col gap-10 max-w-300 mx-auto">
			<div>
				<h1 className="font-sans text-4xl md:text-5xl font-extrabold text-surface-foreground mb-4">
					Mis Turnos
				</h1>
				<p className="font-sans text-lg text-muted max-w-2xl">
					Gestioná tus próximas consultas y revisá tu historial de atención
					médica.
				</p>
			</div>

			<section>
				<div className="flex justify-between items-end mb-8 border-b border-border pb-4">
					<h2 className="font-sans text-2xl md:text-3xl font-semibold text-surface-foreground">
						Próximos Turnos
					</h2>
					<Button
						variant="ghost"
						className="hover:text-blue-900"
						onPress={() => navigate("/")}
					>
						<span className="material-symbols-outlined" aria-hidden="true">
							add_circle
						</span>
						Nuevo Turno
					</Button>
				</div>

				{/* Turnos agendados proximos */}
				{upcomingTurnos.length === 0 ? (
					<p className="font-sans text-base text-muted">
						No tiene próximos turnos
					</p>
				) : (
					<div className="grid gap-6 lg:grid-cols-2">
						{upcomingTurnos.map((turno) => (
							<TurnoAgendadoCard key={turno.id} turno={turno} />
						))}
					</div>
				)}
			</section>

			<TurnosPasados turnos={pastTurnos} />
		</div>
	);
}
