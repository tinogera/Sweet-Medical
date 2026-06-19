import { Card } from "@heroui/react";
import { Link } from "react-router-dom";

const BusquedasEspecificas = ({ icon, title, description, to, buttonName }) => {
	return (
		<Link to={to} className="block group">
			<Card
				className="p-8 flex flex-col items-center justify-center text-center 
				transition duration-200 hover:bg-surface-tertiary hover:shadow-sm 
				border border-focus/20 hover:border-focus h-full"
			>
				<Card.Header className="flex flex-col items-center text-center">
					<div
						className="size-16 bg-surface-terciary rounded-full flex items-center justify-center 
            			mb-6 shadow-sm group-hover:bg-surface group-hover:scale-105 transition-transform"
					>
						<span
							className="material-symbols-outlined text-accent text-3xl"
							style={{ fontVariationSettings: "'FILL' 1" }}
						>
							{icon}
						</span>
					</div>
					<Card.Title className="font-sans text-2xl font-semibold text-surface-foreground mb-3">
						{title}
					</Card.Title>
					<Card.Description className="font-sans text-base text-muted mb-6">
						{description}
					</Card.Description>
				</Card.Header>
				<Card.Footer className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition duration-200">
					<span className="button button--primary">{buttonName}</span>
				</Card.Footer>
			</Card>
		</Link>
	);
};

export default BusquedasEspecificas;
