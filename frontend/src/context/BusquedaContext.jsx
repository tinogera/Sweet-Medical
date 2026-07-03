import { createContext, useContext, useState, useEffect } from "react";
import { DEMO_PACIENTE_ID } from "../config";
import { getPacientes } from "../service/pacientesService";

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

  useEffect(() => {
    const cargarPacienteInicial = async () => {
      try {
        const pacientes = await getPacientes();
        if (pacientes && pacientes.length > 0) {
          const idPaciente = pacientes[0].id;
          setBusqueda((prev) => ({
            ...prev,
            pacienteId: prev.pacienteId || idPaciente
          }));
        }
      } catch (e) {
        console.error("Error cargando paciente inicial", e);
      }
    };
    cargarPacienteInicial();
  }, []);

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
