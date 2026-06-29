import { createContext, useContext, useState } from "react";
import { DEMO_PACIENTE_ID } from "../config";

const BusquedaContext = createContext(null);

const ESTADO_INICIAL = {
  tipo: null,
  label: null,
  profesionalId: null,
  especialidad: null,
  practica: null,
  pacienteId: DEMO_PACIENTE_ID,
};

export function BusquedaProvider({ children, initialValue }) {
  const [busqueda, setBusqueda] = useState(initialValue ?? ESTADO_INICIAL);

  const setSearchOptions = (opts) => {
    setBusqueda((prev) => ({ ...prev, ...opts }));
  };

  const reset = () => {
    setBusqueda(ESTADO_INICIAL);
  };

  return (
    <BusquedaContext.Provider value={{ busqueda, setSearchOptions, reset }}>
      {children}
    </BusquedaContext.Provider>
  );
}

export function useBusqueda() {
  const ctx = useContext(BusquedaContext);
  if (!ctx) {
    throw new Error("useBusqueda debe usarse dentro de un BusquedaProvider");
  }
  return ctx;
}
