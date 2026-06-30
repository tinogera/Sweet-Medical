import { useState } from "react";
import { Alert, Button } from "@heroui/react";
import MedicosCarousel from "../../components/medicos/MedicosCarousel";
import SearchBar from "../../components/searchBar/SearchBar";

import { useMedicos } from "../../hooks/useMedicos";

export default function BusquedaMedico() {
  const { data: medicos, loading, error, refetch } = useMedicos();
  const [medicosFiltrados, setMedicosFiltrados] = useState([])
  const [busquedaRealizada, setBusquedaRealizada] = useState(false)

  const sinResultados = busquedaRealizada && medicosFiltrados.length === 0;

  const filtrarMedicos = (searchText) => {
      const texto = searchText.toLowerCase();
      const filtered = medicos.filter(medico =>
        medico.nombre.toLowerCase().includes(texto)
      );
      setMedicosFiltrados(filtered);
      setBusquedaRealizada(true);
  };

	if (error) {
		return (
			<div className="pt-30 pb-20 px-6 max-w-300 mx-auto">
				<div className="text-center mb-12 fade-in">
					<h1 className="font-sans text-[40px] font-bold text-surface-foreground mb-4">
						¿A quién estás buscando?
					</h1>
					<p className="font-sans text-lg text-muted">
						Ingresá el nombre del profesional para ver su disponibilidad.
					</p>
				</div>
				<div className="max-w-md mx-auto">
					<Alert color="danger" title="No pudimos cargar los profesionales">
						Verificá tu conexión e intentá nuevamente.
					</Alert>
					<div className="flex justify-center mt-4">
						<Button variant="solid" color="primary" onPress={refetch}>
							Reintentar
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="pt-30 pb-20 px-6 max-w-300 mx-auto">
			{/* Header Section */}
			<div
				className="text-center mb-12 fade-in">
				<h1 className="font-sans text-[40px] font-bold text-surface-foreground mb-4">
					¿A quién estás buscando?
				</h1>
				<p className="font-sans text-lg text-muted">
					Ingresá el nombre del profesional para ver su disponibilidad.
				</p>
			</div>

			{/* Search Bar */}
			<SearchBar
				name="medico"
				placeholder="Ej. Carlos Gardel"
				onSearch={filtrarMedicos}
				showButton={true}
			/>

			{/* Results Section */}
			<div>
        <div className="max-w-4xl mx-auto">
          {loading ? (
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
