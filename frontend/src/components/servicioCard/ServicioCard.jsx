import { ToggleButton } from "@heroui/react";

const ServicioCard = ({ id, icon, label }) => {
	return (
		<ToggleButton
			id={id}
			className="flex items-center justify-start w-full p-10 
				bg-surface border border-border rounded-xl hover:bg-surface-secondary 
				data-[selected=true]:border-accent text-left"
		>
			{({ isSelected }) => (
				<>
					<div className="flex items-center gap-4 min-w-0 w-full">
						<div
							className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${
								isSelected
									? "bg-accent text-accent-foreground"
									: "bg-surface-tertiary text-accent"
							}`}
						>
							<span className="material-symbols-outlined" aria-hidden="true">
								{icon}
							</span>
						</div>
						<span className="font-sans text-lg text-surface-foreground break-words whitespace-normal leading-tight">
							{label}
						</span>
					</div>
				</>
			)}
		</ToggleButton>
	);
};

export default ServicioCard;
