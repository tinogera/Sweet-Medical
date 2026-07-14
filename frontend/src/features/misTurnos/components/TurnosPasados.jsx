import { Button, Chip, Table } from "@heroui/react";

const ESTADO_CONFIG = {
	asistio: { label: "Realizado", color: "success", icon: "check" },
	cancelado: { label: "Cancelado", color: "danger", icon: "close" },
	pendiente: { label: "Reprogramado", color: "warning", icon: "schedule" },
};

export default function TurnosPasados({ turnos }) {
	return (
		<section className="flex flex-col gap-4">
			<div className="border-b border-border pb-4">
				<h2 className="font-sans text-2xl font-semibold text-surface-foreground">
					Turnos Pasados{" "}
					<span className="text-base font-normal text-muted ml-2">
						(Últimos 3 meses)
					</span>
				</h2>
			</div>

			<Table className="border border-border">
				<Table.ScrollContainer>
					<Table.Content aria-label="Turnos pasados" className="min-w-150">
						<Table.Header>
							<Table.Column isRowHeader>Fecha</Table.Column>
							<Table.Column>Profesional</Table.Column>
							<Table.Column>Especialidad</Table.Column>
							<Table.Column>Sede</Table.Column>
							<Table.Column>Estado</Table.Column>
						</Table.Header>
						<Table.Body>
							{turnos.map((turno) => {
								const estado = ESTADO_CONFIG[turno.estado];
								return (
									<Table.Row
										key={turno.id}
										id={turno.id}
										className={turno.estado === "cancelado" ? "opacity-70" : ""}
									>
										<Table.Cell>
											<div className="flex flex-col">
												<span className="font-semibold text-surface-foreground">
													{turno.fechaCorta}
												</span>
												<span className="text-sm text-muted">{turno.hora}</span>
											</div>
										</Table.Cell>
										<Table.Cell className="font-medium text-surface-foreground">
											{turno.profesional}
										</Table.Cell>
										<Table.Cell className="text-muted">
											{turno.especialidad}
										</Table.Cell>
										<Table.Cell className="text-muted text-sm">
											{turno.sede}
										</Table.Cell>
										<Table.Cell>
											<Chip color={estado.color} size="sm">
												<span
													className="material-symbols-outlined text-base"
													aria-hidden="true"
												>
													{estado.icon}
												</span>
												<Chip.Label>{estado.label}</Chip.Label>
											</Chip>
										</Table.Cell>
									</Table.Row>
								);
							})}
						</Table.Body>
					</Table.Content>
				</Table.ScrollContainer>
				<Table.Footer className="flex justify-center py-4">
					<Button
						variant="ghost"
						className="text-foreground/60 hover:text-foreground"
					>
						Ver historial completo
					</Button>
				</Table.Footer>
			</Table>
		</section>
	);
}
