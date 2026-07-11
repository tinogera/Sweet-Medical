import React, { useEffect, useState } from "react";
import HeaderDisponibilidad from "./components/HeaderDisponibilidad";
import FormDisponibilidad from "./components/FormDisponibilidad";
import ListaDisponibilidad from "./components/ListaDisponibilidad";
import {
  getMedicos,
  getDisponibilidad,
  agregarDisponibilidad,
  eliminarDisponibilidad,
} from "../../service/disponibilidadService";

export default function Disponibilidad() {
  const [medicos, setMedicos] = useState([]);
  const [medicoActivo, setMedicoActivo] = useState(null);
  const [agenda, setAgenda] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getMedicos()
      .then((list) => {
        setMedicos(list);
        if (list.length > 0) setMedicoActivo(list[0]);
      })
      .catch(() => setError("Error al obtener médicos"))
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    if (medicoActivo) {
      getDisponibilidad(medicoActivo.id)
        .then((res) => setAgenda(res.agenda || []))
        .catch(() => setError("Error al cargar agenda"));
    }
  }, [medicoActivo]);

  const handleAgregar = async (data) => {
    setMensaje("");
    setError("");
    try {
      const res = await agregarDisponibilidad(medicoActivo.id, data);
      const updated = await getDisponibilidad(medicoActivo.id);
      setAgenda(updated.agenda || []);
      setMensaje(`Horario agregado. Turnos creados: ${res.turnosGenerados}`);
    } catch (err) {
      setError(err.response?.data?.message || "Error al agregar horario");
    }
  };

  const handleEliminar = async (index) => {
    if (!window.confirm("¿Seguro que deseas eliminar este bloque de horario?")) return;
    setMensaje("");
    setError("");
    try {
      await eliminarDisponibilidad(medicoActivo.id, index);
      const res = await getDisponibilidad(medicoActivo.id);
      setAgenda(res.agenda || []);
      setMensaje("Horario eliminado con éxito.");
    } catch (err) {
      setError("Error al eliminar horario");
    }
  };

  if (cargando) return <div className="p-8 text-center text-sm">Cargando...</div>;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <HeaderDisponibilidad
        medicos={medicos}
        medicoActivo={medicoActivo}
        onChangeMedico={(id) => setMedicoActivo(medicos.find((m) => m.id === id))}
      />

      {mensaje && <p className="mb-4 p-3 bg-green-100 text-green-800 rounded text-sm">{mensaje}</p>}
      {error && <p className="mb-4 p-3 bg-red-100 text-red-800 rounded text-sm">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormDisponibilidad sedes={medicoActivo?.sedes || []} onAgregar={handleAgregar} />
        <div className="md:col-span-2">
          <ListaDisponibilidad agenda={agenda} onEliminar={handleEliminar} />
        </div>
      </div>
    </main>
  );
}
