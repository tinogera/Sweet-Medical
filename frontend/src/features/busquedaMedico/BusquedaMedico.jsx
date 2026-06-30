import { useEffect, useState } from "react";
import MedicosCarousel from "../../components/medicos/MedicosCarousel";
import SearchBar from "../../components/searchBar/SearchBar";
import SiguientePaso from "../../components/siguientePaso/SiguientePaso";
import { getMedicos } from "../../service/busquedaMedicoService";

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
		<div className="pt-30 pb-20 px-6 max-w-300 mx-auto">
			<div
				className="text-center mb-12 fade-in">
				<h1 className="font-sans text-[40px] font-bold text-surface-foreground mb-4">
					¿A quién estás buscando?
				</h1>
				<p className="font-sans text-lg text-muted">
					Ingresá el nombre del profesional para ver su disponibilidad.
				</p>
			</div>

			<SearchBar
				name="medico"
				placeholder="Ej. Carlos Gardel"
				onSearch={filtrarMedicos}
				showButton={true}
			/>

			<div>
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
              <div
                className="fade-in"
                style={{ animationDelay: "0.15s" }}
              >
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
              </div>
            </>
          )}
          
      </div>
      </div>
    </div>
    );
  }
