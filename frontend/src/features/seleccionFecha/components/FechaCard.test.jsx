import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FechaCard from "./FechaCard";

describe("FechaCard", () => {
  test("renders day name, day number, and month in available state", () => {
    render(
      <FechaCard
        fechaKey="2026-07-15"
        dayName="Mié"
        dayNumber={15}
        month="Jul"
        isSelected={false}
        hasTurnos={true}
        onSelect={() => {}}
      />,
    );

    const card = screen.getByTestId("fecha-card");
    expect(card).toBeInTheDocument();
    expect(screen.getByText("Mié")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("Jul")).toBeInTheDocument();
  });

  test("renders selected state with accent styling", () => {
    render(
      <FechaCard
        fechaKey="2026-07-15"
        dayName="Mié"
        dayNumber={15}
        month="Jul"
        isSelected={true}
        hasTurnos={true}
        onSelect={() => {}}
      />,
    );

    const card = screen.getByTestId("fecha-card");
    expect(card).toBeInTheDocument();
  });

  test("disabled state shows Sin turnos and ignores clicks", () => {
    const onSelect = vi.fn();
    render(
      <FechaCard
        fechaKey="2026-07-15"
        dayName="Mié"
        dayNumber={15}
        month="Jul"
        isSelected={false}
        hasTurnos={false}
        onSelect={onSelect}
      />,
    );

    expect(screen.getByText("Sin turnos")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("fecha-card"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  test("fires onSelect when available card is clicked", () => {
    const onSelect = vi.fn();
    render(
      <FechaCard
        fechaKey="2026-07-15"
        dayName="Mié"
        dayNumber={15}
        month="Jul"
        isSelected={false}
        hasTurnos={true}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(screen.getByTestId("fecha-card"));
    expect(onSelect).toHaveBeenCalledWith("2026-07-15");
  });
});
