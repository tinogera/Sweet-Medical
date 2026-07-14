import { Card, Chip } from "@heroui/react";
import CancelarModal from "./CancelarModal";
import { cancelarTurno } from "../../../service/turnosService";

const MODALIDAD_ICONS = {
	presencial: "stethoscope",
	teleconsulta: "computer",
};

export default function TurnoAgendadoCard({
	dia,
	mes,
	hora,
	especialidad,
	profesional,
	sede,
	modalidad,
	modalidadDetalle,
	fecha,
	onCancel,
}) {
	return (
		<Card
			className="flex flex-col md:flex-row gap-6 p-6 w-full"
			variant="default"
		>
			<div className="bg-surface-secondary border border-border rounded-lg p-4 flex flex-col items-center justify-center min-w-25">
				<span className="font-sans text-3xl font-bold text-accent">
					{dia}
				</span>
				<span className="font-sans text-sm font-bold text-surface-foreground uppercase tracking-wider">
					{mes}
				</span>
				<span className="font-sans text-sm text-muted mt-1">{hora}</span>
			</div>

			<div className="flex-1 flex flex-col justify-center gap-2">
				<Chip className="bg-blue-100 text-blue-900 w-fit" size="sm">
					{especialidad}
				</Chip>

				<h3 className="font-sans text-xl font-semibold text-surface-foreground">
					{profesional}
				</h3>

				<div className="flex flex-col gap-1 text-sm text-muted">
					<p className="flex items-center gap-2">
						<span
							className="material-symbols-outlined text-base"
							aria-hidden="true"
						>
							location_on
						</span>
						{sede}
					</p>
					<p className="flex items-center gap-2">
						<span
							className="material-symbols-outlined text-base"
							aria-hidden="true"
						>
							{MODALIDAD_ICONS[modalidad]}
						</span>
						{modalidad === "teleconsulta" ? "Teleconsulta" : "Presencial"}
					</p>
					{modalidadDetalle && (
						<p className="flex items-center gap-2">
							<span
								className="material-symbols-outlined text-base"
								aria-hidden="true"
							>
								link
							</span>
							{modalidadDetalle}
						</p>
					)}
				</div>
			</div>

			<div className="flex flex-col justify-center md:pl-4 md:border-l border-border pt-4 md:pt-0">
				<CancelarModal
					fechaLabel={`${fecha} ${hora}`}
					medicoLabel={profesional}
					servicioLabel={especialidad}
					onConfirm={onCancel}
				/>
			</div>
		</Card>
	);
}
