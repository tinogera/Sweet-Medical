import { useState } from "react";

const MedicosSearchBar = ({filtrarMedicos} ) => {
    const [searchText,setSearchText] = useState('')

    return (
        <div className="max-w-2xl mx-auto mb-16 flex flex-col items-center gap-6">
          <div className="w-full relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-secondary" data-icon="search">search</span>
            </div>
            <input className="w-full pl-12 pr-4 py-4 rounded-xl border border-secondary-fixed bg-surface-container-lowest text-on-surface font-body-main focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors shadow-sm" 
            placeholder="Ej. Javier" 
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button 
            type="button" 
            className="px-10 py-4 rounded-full bg-primary-container text-on-primary font-cta-label text-cta-label hover:opacity-90 transition-opacity shadow-sm"
            onClick = { () => filtrarMedicos(searchText)}
          >
            Buscar
          </button>
        </div>
    )
}

export default MedicosSearchBar