import { Button, Card } from "@heroui/react";

const TurnoReciente = ({ nombre, especialidad, onRepetir }) => {
	return (
		<Card className="p-4 flex-row items-center justify-between">
			<div className="flex items-center gap-4">
				<div className="w-10 h-10 bg-surface-secondary rounded-full flex items-center justify-center">
					<span className="material-symbols-outlined text-accent text-xl">
						history
					</span>
				</div>
				<Card.Content className="p-0">
					<p className="font-sans text-lg font-semibold text-surface-foreground">
						{nombre}
					</p>
					<p className="font-sans text-base text-muted">
						{especialidad}
					</p>
				</Card.Content>
			</div>
			<Button variant="tertiary" size="sm" className="hidden md:flex" onPress={onRepetir}>
				Repetir turno
			</Button>
			<Button isIconOnly variant="ghost" className="md:hidden text-accent" onPress={onRepetir} aria-label="Repetir turno">
				<span className="material-symbols-outlined">arrow_forward</span>
			</Button>
		</Card>
	);
};

export default TurnoReciente;
