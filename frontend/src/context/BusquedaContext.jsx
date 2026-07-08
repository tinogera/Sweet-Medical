import { createContext, useContext, useState, useEffect } from "react";
import { DEMO_PACIENTE_ID, DEMO_MEDICO_ID } from "../config";
import { getPacientes } from "../service/pacientesService";

const BusquedaContext = createContext(null);

const ESTADO_INICIAL = {
  tipo: null,
  label: null,
  profesionalId: null,
  especialidad: null,
  practica: null,
  pacienteId: DEMO_PACIENTE_ID,
  medicoId: DEMO_MEDICO_ID
};

export function BusquedaProvider({ children, initialValue }) {
  const [busqueda, setBusqueda] = useState(initialValue ?? ESTADO_INICIAL);

  const actualizarBusqueda = (opts) => {
    setBusqueda((prev) => ({ ...prev, ...opts }));
  };

  const reset = () => {
    setBusqueda(ESTADO_INICIAL);
  };

  return (
    <BusquedaContext.Provider value={{ busqueda, actualizarBusqueda, reset }}>
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
