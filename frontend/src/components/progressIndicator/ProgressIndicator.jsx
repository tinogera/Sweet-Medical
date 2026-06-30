import { ProgressBar } from "@heroui/react";

const ProgressIndicator = ({ step = 1, totalSteps = 3, label }) => {
	const value = (step / totalSteps) * 100;
	const ariaLabel = label || `Progreso paso ${step} de ${totalSteps}`;

	return (
		<div className="flex flex-col gap-1 w-full max-w-xl">
			<span className="font-bold text-muted uppercase tracking-wider">
				{`PASO ${step} DE ${totalSteps}`}
				{label && <span className="hidden sm:inline">{` • ${label}`}</span>}
			</span>
			<div className="hidden sm:block">
				<ProgressBar aria-label={ariaLabel} value={value} color="accent">
					<ProgressBar.Track>
						<ProgressBar.Fill />
					</ProgressBar.Track>
				</ProgressBar>
			</div>
		</div>
	);
};

export default ProgressIndicator;
