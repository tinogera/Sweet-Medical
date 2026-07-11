import React, { useState, useEffect } from "react";

export default function FormDisponibilidad({ sedes, onAgregar }) {
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("08:00");
  const [horaFin, setHoraFin] = useState("12:00");
  const [sedeName, setSedeName] = useState("");

  useEffect(() => {
    if (sedes.length > 0) setSedeName(sedes[0].nombre);
  }, [sedes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fecha || !horaInicio || !horaFin || !sedeName) return;
    onAgregar({
      fecha,
      horaInicio: `${horaInicio}:00`,
      horaFin: `${horaFin}:00`,
      sedeName
    });
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded flex flex-col gap-4 bg-gray-50 text-sm">
      <h3 className="font-bold text-gray-700">Nueva Disponibilidad</h3>
      <div>
        <label className="block font-semibold mb-1">Sede</label>
        <select value={sedeName} onChange={e => setSedeName(e.target.value)} className="w-full border p-2 rounded bg-white">
          {sedes.map(s => <option key={s.nombre} value={s.nombre}>{s.nombre}</option>)}
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-1">Fecha</label>
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block font-semibold mb-1">Inicio</label>
          <input type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Fin</label>
          <input type="time" value={horaFin} onChange={e => setHoraFin(e.target.value)} className="w-full border p-2 rounded" />
        </div>
      </div>
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold mt-2 cursor-pointer">
        Agregar
      </button>
    </form>
  );
}
