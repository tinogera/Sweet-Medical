import { Button, Modal } from "@heroui/react";

export default function ConfirmarModal({
	profesional,
	servicio,
	fechaLabel,
	onConfirm,
	reservando,
}) {
	return (
		<Modal>
			<Modal.Trigger>
				<Button
					className="w-full md:w-auto"
					isDisabled={reservando}
				>
					{reservando ? "Reservando..." : "Confirmar Reserva"}
				</Button>
			</Modal.Trigger>
			<Modal.Backdrop>
				<Modal.Container>
					<Modal.Dialog className="sm:max-w-90">
						<Modal.Header>
							<Modal.Heading className="flex items-center justify-start gap-2 text-2xl font-bold text-foreground">
								<span className="material-symbols-outlined">event_available</span>
								Confirmar reserva
							</Modal.Heading>
						</Modal.Header>
						<Modal.Body>
							<p className="font-sans text-base text-pretty text-surface-foreground">
								¿Confirmás la reserva del turno con{" "}
								<strong>{profesional}</strong> para{" "}
								<strong>{servicio}</strong> el{" "}
								<strong>{fechaLabel}</strong>?
							</p>
						</Modal.Body>
						<Modal.Footer className="flex flex-col sm:flex-row gap-2">
							<Button variant="ghost" className="w-full" slot="close">
								Volver
							</Button>
							<Button
								className="w-full"
								onPress={onConfirm}
								isDisabled={reservando}
								slot="close"
							>
								{reservando ? "Reservando..." : "Sí, reservar"}
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
