import { useState, useEffect } from "react";
import MedicosCarousel from '../../components/medicos/MedicosCarousel';
import SiguientePaso from '../../components/siguientePaso/SiguientePaso';
import { getMedicos } from '../../service/busquedaMedicoService';
import MedicosSearchBar from '../../components/medicosSearchBar/MedicosSearchBar';


export default function BusquedaMedico() {
  const [medicos, setMedicos] = useState([])
  const [medicosFiltrados, setMedicosFiltrados] = useState([])
  const [busquedaRealizada, setBusquedaRealizada] = useState(false)
  const [cargando, setCargando] = useState(true)

  const sinResultados = busquedaRealizada && medicosFiltrados.length === 0;

  useEffect(() => {
    const cargarMedicos = async () => {
      setCargando(true)
      const data = await getMedicos()
      if (data) {
        setMedicos(data)
        //setMedicosFiltrados(data)
      }
      setCargando(false)
    }
    cargarMedicos()
  }, [])

  const filtrarMedicos = (searchText) => {
      const texto = searchText.toLowerCase();
      const filtered = medicos.filter(medico =>
        medico.nombre.toLowerCase().includes(texto)
      );
      setMedicosFiltrados(filtered);
      setBusquedaRealizada(true);
  };

  return (
    <main className="flex-grow pt-[120px] pb-section-padding px-gutter max-w-container-max mx-auto w-full">
      {/* Progress Bar Section */}
      <div className="w-full max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="font-cta-label text-cta-label text-secondary uppercase tracking-wider text-sm">PASO 1 DE 3 • Búsqueda de Profesional</span>
        </div>
        <div className="flex gap-2 w-full h-2">
          <div className="flex-1 bg-primary-container rounded-full"></div>
          <div className="flex-1 bg-secondary-fixed rounded-full"></div>
          <div className="flex-1 bg-secondary-fixed rounded-full"></div>
        </div>
      </div>

      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="font-h2-section text-h2-section text-on-surface mb-4">¿A quién estás buscando?</h1>
        <p className="font-body-main text-body-main text-text-secondary">Ingresá el nombre del profesional para ver su disponibilidad.</p>
      </div>

      {/* Search Bar */}
      <MedicosSearchBar filtrarMedicos = {filtrarMedicos}></MedicosSearchBar>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto">
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-12 h-12 border-4 border-outline-variant border-t-primary rounded-full animate-spin"></div>
            <p className="font-body-main text-text-secondary animate-pulse">
              Cargando profesionales...
            </p>
          </div>
        ) : (
          <>
            {busquedaRealizada && (
              <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface mb-6">
                Resultados de la búsqueda
              </h2>
            )}
            {sinResultados && (
              <h3 className="font-body-main text-text-secondary text-center mb-6">
                No hubo resultados para esa búsqueda
              </h3>
            )}
            <div className="flex flex-col gap-4">
              <MedicosCarousel medicosCargados={medicosFiltrados}></MedicosCarousel>
            </div>
          </>
        )}

        {/* Bottom Action */}
        <div className="mt-12 flex justify-end">
          <SiguientePaso></SiguientePaso>
        </div>
      </div>
    </main>
  );
}
