import React from 'react';

export default function HistorialTurnosTable() {
  return (
    <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-alternate border-b border-outline-variant text-secondary font-cta-label text-body-sm">
              <th className="p-4">Profesional y Servicio</th>
              <th className="p-4">Fecha y Hora</th>
              <th className="p-4">Sede</th>
              <th className="p-4 text-right">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors font-body-sm text-body-sm text-text-secondary">
              <td className="p-4">
                <p className="font-semibold text-on-surface-variant">Dra. Lopez Laura</p>
                <p className="text-xs text-text-secondary">Pediatría</p>
              </td>
              <td className="p-4">
                <p className="font-semibold text-on-surface-variant">Lunes 10 de Mayo</p>
                <p className="text-xs text-text-secondary">10:00 hs</p>
              </td>
              <td className="p-4">Sede Belgrano</td>
              <td className="p-4 text-right">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-surface-container-high text-on-surface-variant">
                  REALIZADO
                </span>
              </td>
            </tr>
            <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors font-body-sm text-body-sm text-text-secondary">
              <td className="p-4">
                <p className="font-semibold text-on-surface-variant">Dr. Gomez Carlos</p>
                <p className="text-xs text-text-secondary">Cardiología</p>
              </td>
              <td className="p-4">
                <p className="font-semibold text-on-surface-variant">Jueves 15 de Abril</p>
                <p className="text-xs text-text-secondary">16:15 hs</p>
              </td>
              <td className="p-4">Sede Palermo</td>
              <td className="p-4 text-right">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-error-container text-error">
                  CANCELADO
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
