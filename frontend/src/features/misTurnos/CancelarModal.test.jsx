import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CancelarModal from "./CancelarModal";

describe("CancelarModal", () => {
	const defaultProps = {
		fechaLabel: "2025-11-15 10:30 hs",
		medicoLabel: "Dr. Martín Rossi",
		servicioLabel: "Cardiología",
		onConfirm: () => {},
	};

	// Modal.Trigger renders both a div[role=button] wrapper and the actual <button>.
	// Helper to click the real <button> element (not the div wrapper).
	const clickCancelarTrigger = async () => {
		const buttons = screen.getAllByRole("button", { name: /^Cancelar$/i });
		const realButton = buttons.find((el) => el.tagName === "BUTTON");
		await userEvent.click(realButton);
	};

	test("opens modal when trigger is clicked and renders title and labels", async () => {
		render(<CancelarModal {...defaultProps} />);

		await clickCancelarTrigger();

		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Cancelar turno")).toBeInTheDocument();
		expect(
			screen.getByText(
				/¿Seguro que querés cancelar el turno con Dr\. Martín Rossi para Cardiología el día 2025-11-15 10:30 hs\?/i,
			),
		).toBeInTheDocument();
	});

	test("does not render dialog before trigger is clicked", () => {
		render(<CancelarModal {...defaultProps} />);

		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("calls onConfirm when confirm button is clicked", async () => {
		const handleConfirm = vi.fn();

		render(<CancelarModal {...defaultProps} onConfirm={handleConfirm} />);

		await clickCancelarTrigger();
		await userEvent.click(screen.getByRole("button", { name: /Sí, cancelar/i }));
		expect(handleConfirm).toHaveBeenCalledTimes(1);
	});

	test("Volver button has slot='close' to dismiss the modal", async () => {
		render(<CancelarModal {...defaultProps} />);

		await clickCancelarTrigger();

		const volverButton = screen.getByRole("button", { name: /Volver/i });
		expect(volverButton).toHaveAttribute("slot", "close");
	});
});