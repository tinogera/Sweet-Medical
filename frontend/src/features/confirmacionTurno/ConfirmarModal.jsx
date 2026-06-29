import { Alert, Button, Modal } from "@heroui/react";

export default function ConfirmarModal({
	isOpen = false,
	onOpenChange = () => {},
	turno,
	fechaLabel,
	onConfirm = () => {},
	onRefetch = () => {},
	reservando = false,
	error = null,
	errorType = null,
}) {
	const is409 = errorType === "409";
	const hasError = !!error;

	const handleErrorAction = () => {
		if (is409) {
			onRefetch();
		}
	};

	return (
		<Modal.Backdrop
			variant="blur"
			isOpen={isOpen}
			onOpenChange={onOpenChange}
		>
			<Modal.Container>
				<Modal.Dialog className="sm:max-w-90">
					<Modal.CloseTrigger
						aria-label="Cerrar"
						className="absolute top-4 right-4 z-10"
					>
						<span className="material-symbols-outlined text-foreground hover:text-accent transition-colors">
							close
						</span>
					</Modal.CloseTrigger>

					<Modal.Header>
						<Modal.Heading className="flex items-center justify-start gap-2 text-2xl font-bold text-foreground">
							<span className="material-symbols-outlined !text-[28px]">
								event_available
							</span>
							Confirmar Reserva
						</Modal.Heading>
					</Modal.Header>

					<Modal.Body>
						<p className="font-sans text-base text-pretty text-surface-foreground mb-4">
							Estás a un paso de confirmar tu turno. Por favor revisá los
							datos:
						</p>

						{hasError && (
							<div className="mb-4">
								<Alert status="danger">
									<Alert.Content>
										<Alert.Description>{error}</Alert.Description>
									</Alert.Content>
								</Alert>
							</div>
						)}

						{turno && (
							<div className="bg-bg-alternate rounded-lg p-5 border border-border space-y-4">
								{/* Date/Time */}
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined !text-[20px] text-accent">
										schedule
									</span>
									<div>
										<p className="font-sans text-xs text-muted font-semibold">
											Fecha y Hora
										</p>
										<p className="font-sans text-sm font-bold text-foreground">
											{fechaLabel}
										</p>
									</div>
								</div>
								<hr className="border-border" />

								{/* Professional */}
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined !text-[20px] text-accent">
										person
									</span>
									<div>
										<p className="font-sans text-xs text-muted font-semibold">
											Profesional
										</p>
										<p className="font-sans text-sm font-medium text-foreground">
											{turno.profesional}
										</p>
									</div>
								</div>
								<hr className="border-border" />

								{/* Service */}
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined !text-[20px] text-accent">
										medical_services
									</span>
									<div>
										<p className="font-sans text-xs text-muted font-semibold">
											Servicio
										</p>
										<p className="font-sans text-sm font-medium text-foreground">
											{turno.servicio}
										</p>
									</div>
								</div>
								<hr className="border-border" />

								{/* Location */}
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined !text-[20px] text-accent">
										location_on
									</span>
									<div>
										<p className="font-sans text-xs text-muted font-semibold">
											Sede
										</p>
										<p className="font-sans text-sm font-medium text-foreground">
											{turno.sede}
										</p>
									</div>
								</div>
								<hr className="border-border" />

								{/* Cost */}
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined !text-[20px] text-accent">
										payments
									</span>
									<div>
										<p className="font-sans text-xs text-muted font-semibold">
											Costo
										</p>
										<p className="font-sans text-sm font-medium text-foreground">
											Cubierto por tu obra social
										</p>
									</div>
								</div>
							</div>
						)}
					</Modal.Body>

					<Modal.Footer className="flex flex-col sm:flex-row gap-2">
						<Button
							className="w-full"
							variant="primary"
							isPending={reservando}
							isDisabled={reservando}
							onPress={is409 ? handleErrorAction : onConfirm}
						>
							{is409
								? "Ver turnos disponibles"
								: reservando
									? "Reservando..."
									: "Confirmar"}
						</Button>
						<Button
							variant="outline"
							className="w-full"
							slot="close"
						>
							Volver
						</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}
