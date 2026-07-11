import React from "react";

export default function ListaDisponibilidad({ agenda, onEliminar }) {
  if (agenda.length === 0) {
    return <div className="border p-6 rounded text-gray-500 text-center">No hay horarios cargados.</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-bold text-gray-700">Horarios Activos</h3>
      {agenda.map((b, idx) => {
        const dInicio = new Date(b.horaInicio);
        const dFin = new Date(b.horaFin);
        const fechaStr = dInicio.toLocaleDateString("es-AR");
        const horaStr = `${dInicio.toLocaleTimeString("es-AR", { hour: '2-digit', minute: '2-digit' })} a ${dFin.toLocaleTimeString("es-AR", { hour: '2-digit', minute: '2-digit' })}`;

        return (
          <div key={b.id || idx} className="border p-4 rounded flex justify-between items-center bg-white shadow-sm">
            <div>
              <p className="font-bold text-gray-800">{fechaStr}</p>
              <p className="text-xs text-gray-500 mt-1">Sede: {b.sede} | Horario: {horaStr}</p>
            </div>
            <button 
              onClick={() => onEliminar(idx)} 
              className="text-red-600 hover:text-red-800 font-semibold text-sm cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        );
      })}
    </div>
  );
}
