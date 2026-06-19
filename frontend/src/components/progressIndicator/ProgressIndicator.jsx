import { ProgressBar } from "@heroui/react";

const ProgressIndicator = ({
  step = 1,
  totalSteps = 3,
  label,
}) => {
  const value = (step / totalSteps) * 100;
  const ariaLabel = label || `Progreso paso ${step} de ${totalSteps}`;

  return (
    <div className="flex flex-col gap-1 w-xl">
      <span className="font-bold text-muted uppercase tracking-wider">
        {`PASO ${step} DE ${totalSteps}${label ? ` • ${label}` : ""}`}
      </span>
      <ProgressBar aria-label={ariaLabel} value={value} color="accent">
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
    </div>
  );
};

export default ProgressIndicator;
