import { Button } from "@heroui/react";

export default function ActionButtons({
  onContinue,
  isContinueDisabled,
  onCancel,
}) {
  return (
    <div
      className="flex flex-col md:flex-row justify-end items-center gap-4 mt-8 pt-8 border-t border-border fade-in"
      style={{ animationDelay: "0.5s" }}
    >
      <Button
        variant="outline"
        onPress={onCancel}
        className="w-full md:w-auto"
      >
        Cancelar
      </Button>
      <Button
        variant="primary"
        isDisabled={isContinueDisabled}
        onPress={onContinue}
        className="w-full md:w-auto"
      >
        Continuar
        <span className="material-symbols-outlined text-[20px]">
          arrow_forward
        </span>
      </Button>
    </div>
  );
}
