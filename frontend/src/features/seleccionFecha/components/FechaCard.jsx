import { Button } from "@heroui/react";

export default function FechaCard({
  fechaKey,
  dayName,
  dayNumber,
  month,
  isSelected = false,
  hasTurnos = true,
  onSelect,
}) {
  const disabled = !hasTurnos;

  const handlePress = () => {
    if (!disabled && onSelect) {
      onSelect(fechaKey);
    }
  };

  return (
    <Button
      variant={isSelected ? "primary" : "ghost"}
      isDisabled={disabled}
      onPress={handlePress}
      className={`w-21 h-25 rounded-2xl flex flex-col items-center justify-center ${
        !disabled && !isSelected ? "border border-border bg-surface" : ""
      }`}
      data-testid="fecha-card"
    >
      {disabled ? (
        <span className="font-sans text-xs text-muted">Sin turnos</span>
      ) : (
        <>
          <span
            className={`font-sans text-xs uppercase mb-0.5 ${
              isSelected ? "text-accent-foreground font-semibold" : "text-muted"
            }`}
          >
            {dayName}
          </span>
          <span
            className={`font-sans text-xl font-bold ${
              isSelected ? "text-accent-foreground" : "text-surface-foreground"
            }`}
          >
            {dayNumber}
          </span>
          <span
            className={`font-sans text-xs ${
              isSelected ? "text-accent-foreground" : "text-muted"
            }`}
          >
            {month}
          </span>
        </>
      )}
    </Button>
  );
}
