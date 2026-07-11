import React from "react";

export default function HeaderDisponibilidad({ medicos, medicoActivo, onChangeMedico }) {
  return (
    <div className="flex justify-between items-center border-b pb-4 mb-4">
      <div>
        <h1 className="text-2xl font-bold">Disponibilidad de Médicos</h1>
        {medicoActivo && <p className="text-gray-600">Dr. {medicoActivo.nombre} {medicoActivo.apellido}</p>}
      </div>
      <select 
        value={medicoActivo?.id || ""} 
        onChange={(e) => onChangeMedico(e.target.value)}
        className="border p-2 rounded"
      >
        {medicos.map(m => (
          <option key={m.id} value={m.id}>
            {m.nombre} {m.apellido}
          </option>
        ))}
      </select>
    </div>
  );
}
