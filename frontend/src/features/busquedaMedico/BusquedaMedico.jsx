import { useState, useEffect } from "react";
import Header from '../../components/headers/Header';
import PiePagina from '../../components/piePagina/PiePagina';
import MedicosCarousel from '../../components/medicos/MedicosCarousel';
import SiguientePaso from '../../components/siguientePaso/SiguientePaso';
import { getMedicos } from '../../service/busquedaMedicoService';
import MedicosSearchBar from '../../components/medicosSearchBar/MedicosSearchBar';


export default function BusquedaMedico() {
  const [medicos, setMedicos] = useState([])
  const [medicosFiltrados, setMedicosFiltrados] = useState([])
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      const cargarMedicos = async () => {
        setLoading(true);
        try {
          const data = await getMedicos();
          if (data) {
            setMedicos(data);
            setMedicosFiltrados(data); // mostramos todos al inicio
          }
        } finally {
          setLoading(false); // se apaga el skeleton haya o no error
        }
      };
      cargarMedicos();
  }, []);

  const filtrarMedicos = (searchText) => {
      const texto = searchText.toLowerCase();
      const filtered = medicos.filter(medico =>
        medico.nombre.toLowerCase().includes(texto)
      );
      setMedicosFiltrados(filtered);
  };

  return (
    <div className="bg-surface-container-lowest font-body-main text-on-surface min-h-screen flex flex-col">
      <Header></Header>

      <main className="flex-grow flex flex-col items-center pt-[140px] pb-section-padding px-margin-mobile md:px-gutter w-full">
        <div className="w-full max-w-[800px] flex flex-col gap-12">

          {/* Progress Bar */}
          <div className="flex flex-col gap-4 text-center">
            <div className="flex items-center justify-center gap-4 text-secondary font-cta-label text-lg">
              <span className="text-primary-container font-bold">PASO 1 DE 3</span>
              <span className="w-1 h-1 bg-outline rounded-full"></span>
              <span>Búsqueda de Profesional</span>
            </div>
            <div className="w-full bg-secondary-container h-2 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full w-1/3 rounded-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center flex flex-col gap-4">
            <h1 className="font-h2-section-mobile text-h2-section-mobile md:font-h2-section md:text-h2-section text-on-surface">
              ¿A quién estás buscando?
            </h1>
            <p className="font-body-main text-body-main text-text-secondary max-w-[600px] mx-auto">
              Ingresá el nombre del profesional para ver su disponibilidad.
            </p>
          </div>

          {/* Search Bar */}
          <MedicosSearchBar filtrarMedicos={filtrarMedicos} />

          {/* Results */}
          <div className="flex flex-col gap-6">
            <h2 className="font-h3-subtitle text-h3-subtitle text-on-surface">Todos los médicos</h2>
            <div className="flex flex-col gap-4">
              <MedicosCarousel medicosCargados={medicosFiltrados} loading={loading} />
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-end">
            <SiguientePaso />
          </div>

        </div>
      </main>

      <PiePagina></PiePagina>
    </div>
  );
}