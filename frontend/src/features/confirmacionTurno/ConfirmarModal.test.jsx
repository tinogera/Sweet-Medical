import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmarModal from "./ConfirmarModal";

describe("ConfirmarModal", () => {
	const defaultTurno = {
		id: "t1",
		fechaHora: "2026-07-15T09:30:00",
		profesional: "Dr. Fernández",
		servicio: "Cardiología General",
		sede: "Clínica Olivos",
		servicioId: "serv-1",
	};

	const defaultProps = {
		isOpen: true,
		onOpenChange: vi.fn(),
		turno: defaultTurno,
		fechaLabel: "Jueves, 24 de Octubre",
		onConfirm: vi.fn(),
		onRefetch: vi.fn(),
		reservando: false,
		error: null,
		errorType: null,
	};

	function renderModal(props = {}) {
		return render(<ConfirmarModal {...defaultProps} {...props} />);
	}

	// === Task 3.1: Modal structure with blur backdrop, Container, Dialog, CloseTrigger ===

	test("renders modal dialog with content when isOpen is true", () => {
		renderModal();
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Confirmar Reserva")).toBeInTheDocument();
	});

	test("does not render dialog when isOpen is false", () => {
		renderModal({ isOpen: false });
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("modal has CloseTrigger button (X) in the header", () => {
		renderModal();
		// The CloseTrigger renders with aria-label="Cerrar"
		const closeBtn = screen.getByRole("button", { name: /Cerrar/i });
		expect(closeBtn).toBeInTheDocument();
	});

	test("clicking CloseTrigger calls onOpenChange with false", async () => {
		const onOpenChange = vi.fn();
		renderModal({ onOpenChange });
		const closeBtn = screen.getByRole("button", { name: /Cerrar/i });
		await userEvent.click(closeBtn);
		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	// === Task 3.2: Header with title and event_available icon ===

	test("header displays 'Confirmar Reserva' heading", () => {
		renderModal();
		expect(
			screen.getByRole("heading", { name: /Confirmar Reserva/i }),
		).toBeInTheDocument();
	});

	test("header includes event_available Material Symbol icon", () => {
		renderModal();
		const icons = document.querySelectorAll(".material-symbols-outlined");
		const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
		expect(iconTexts).toContain("event_available");
	});

	// === Task 3.3: Body summary card ===

	test("body renders intro text", () => {
		renderModal();
		expect(
			screen.getByText(
				/Estás a un paso de confirmar tu turno/i,
			),
		).toBeInTheDocument();
	});

	test("summary card shows date/time row with schedule icon and fechaLabel", () => {
		renderModal();
		const icons = document.querySelectorAll(".material-symbols-outlined");
		const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
		expect(iconTexts).toContain("schedule");
		expect(screen.getByText("Jueves, 24 de Octubre")).toBeInTheDocument();
	});

	test("summary card shows professional row with person icon and name", () => {
		renderModal();
		const icons = document.querySelectorAll(".material-symbols-outlined");
		const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
		expect(iconTexts).toContain("person");
		expect(screen.getByText("Dr. Fernández")).toBeInTheDocument();
	});

	test("summary card shows service row with medical_services icon", () => {
		renderModal();
		const icons = document.querySelectorAll(".material-symbols-outlined");
		const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
		expect(iconTexts).toContain("medical_services");
		expect(screen.getByText("Cardiología General")).toBeInTheDocument();
	});

	test("summary card shows location row with location_on icon and sede", () => {
		renderModal();
		const icons = document.querySelectorAll(".material-symbols-outlined");
		const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
		expect(iconTexts).toContain("location_on");
		expect(screen.getByText("Clínica Olivos")).toBeInTheDocument();
	});

	test("summary card shows cost row with payments icon", () => {
		renderModal();
		const icons = document.querySelectorAll(".material-symbols-outlined");
		const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
		expect(iconTexts).toContain("payments");
		// Should show cost text
		expect(screen.getByText("Cubierto por tu obra social")).toBeInTheDocument();
	});

	test("summary card uses bg-bg-alternate class for background", () => {
		renderModal();
		const summaryCard = document.querySelector(".bg-bg-alternate");
		expect(summaryCard).toBeInTheDocument();
	});

	// === Task 3.4: Footer with confirm and Volver buttons ===

	test("footer has primary confirm button with 'Confirmar' text", () => {
		renderModal();
		const confirmBtn = screen.getByRole("button", { name: /Confirmar/i });
		expect(confirmBtn).toBeInTheDocument();
		expect(confirmBtn).not.toBeDisabled();
	});

	test("confirm button calls onConfirm when clicked", async () => {
		const onConfirm = vi.fn();
		renderModal({ onConfirm });
		const confirmBtn = screen.getByRole("button", { name: /Confirmar/i });
		await userEvent.click(confirmBtn);
		expect(onConfirm).toHaveBeenCalledTimes(1);
	});

	test("confirm button shows isPending state and is disabled when reservando is true", () => {
		renderModal({ reservando: true });
		// When reservando is true, button text changes to "Reservando..."
		const confirmBtn = screen.getByRole("button", { name: /Reservando/i });
		// Check the button has pending data attribute
		expect(confirmBtn).toHaveAttribute("data-pending", "true");
		// The button should be disabled when pending
		expect(confirmBtn).toBeDisabled();
	});

	test("footer has 'Volver' outline button with slot='close'", () => {
		renderModal();
		const volverBtn = screen.getByRole("button", { name: /Volver/i });
		expect(volverBtn).toBeInTheDocument();
		expect(volverBtn).toHaveAttribute("slot", "close");
	});

	test("Volver button calls onOpenChange with false when clicked", async () => {
		const onOpenChange = vi.fn();
		renderModal({ onOpenChange });
		const volverBtn = screen.getByRole("button", { name: /Volver/i });
		await userEvent.click(volverBtn);
		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	// === Task 3.5: Error states ===

	test("409 error: Alert with status='danger' appears in body", () => {
		renderModal({
			error: "Este turno ya no está disponible.",
			errorType: "409",
		});
		// HeroUI v3 Alert renders as div.alert--danger
		const alertEl = document.querySelector(".alert--danger");
		expect(alertEl).toBeInTheDocument();
		expect(
			screen.getByText("Este turno ya no está disponible."),
		).toBeInTheDocument();
	});

	test("409 error: confirm button text changes to 'Ver turnos disponibles'", () => {
		renderModal({
			error: "Este turno ya no está disponible.",
			errorType: "409",
		});
		expect(
			screen.getByRole("button", { name: /Ver turnos disponibles/i }),
		).toBeInTheDocument();
		// The "Confirmar" button should NOT be present
		expect(
			screen.queryByRole("button", { name: /^Confirmar$/i }),
		).not.toBeInTheDocument();
	});

	test("409 error: clicking 'Ver turnos disponibles' calls onRefetch and closes modal", async () => {
		const onRefetch = vi.fn();
		const onOpenChange = vi.fn();
		renderModal({
			error: "Este turno ya no está disponible.",
			errorType: "409",
			onRefetch,
			onOpenChange,
		});
		const refetchBtn = screen.getByRole("button", {
			name: /Ver turnos disponibles/i,
		});
		await userEvent.click(refetchBtn);
		expect(onRefetch).toHaveBeenCalledTimes(1);
	});

	test("non-409 error: generic error message shows in Alert", () => {
		renderModal({
			error: "Ocurrió un error al reservar el turno.",
			errorType: "other",
		});
		const alertEl = document.querySelector(".alert--danger");
		expect(alertEl).toBeInTheDocument();
		expect(
			screen.getByText("Ocurrió un error al reservar el turno."),
		).toBeInTheDocument();
	});

	test("non-409 error: confirm button stays active for retry", () => {
		renderModal({
			error: "Ocurrió un error al reservar el turno.",
			errorType: "other",
		});
		// Button should still say "Confirmar" and be enabled
		const confirmBtn = screen.getByRole("button", { name: /Confirmar/i });
		expect(confirmBtn).toBeInTheDocument();
		expect(confirmBtn).not.toBeDisabled();
	});

	test("no error state renders no Alert", () => {
		renderModal();
		const alertEl = document.querySelector(".alert--danger");
		expect(alertEl).not.toBeInTheDocument();
	});
});
