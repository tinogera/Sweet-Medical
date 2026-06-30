import { Button, Modal } from "@heroui/react";

export default function CancelarModal({
	fechaLabel,
	medicoLabel,
	servicioLabel,
	onConfirm,
}) {
	return (
		<Modal>
			<Modal.Trigger>
				<Button
					className="hover:bg-accent/10 hover:border-accent/50 hover:text-accent"
					variant="outline"
				>
					Cancelar
				</Button>
			</Modal.Trigger>
			<Modal.Backdrop>
				<Modal.Container>
					<Modal.Dialog className="sm:max-w-90">
						<Modal.Header>
							<Modal.Heading className="flex items-center justify-start gap-2 text-2xl font-bold text-foreground">
								<span className="material-symbols-outlined ">event_busy</span>
								Cancelar turno
							</Modal.Heading>
						</Modal.Header>
						<Modal.Body>
							<p className="font-sans text-base text-pretty text-surface-foreground">
								¿Seguro que querés cancelar el turno con {medicoLabel} para{" "}
								{servicioLabel} el día {fechaLabel}?
							</p>
						</Modal.Body>
						<Modal.Footer className="flex flex-col sm:flex-row gap-2">
							<Button variant="ghost" className="w-full" slot="close">
								Volver
							</Button>
							<Button variant="danger" className="w-full" onPress={onConfirm}>
								Sí, cancelar
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
