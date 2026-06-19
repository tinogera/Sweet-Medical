import { Outlet } from 'react-router-dom';
import PiePagina from '../components/piePagina/PiePagina';

export default function TransactionalLayout() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* Header / TopNavBar (Simplified for transactional flow - Navigation suppressed as per rules) */}
      <header className="bg-surface border-b border-outline-variant w-full sticky top-0 z-50">
        <div className="flex justify-between items-center h-20 px-gutter max-w-container-max mx-auto w-full">
          <div className="flex items-center gap-4">
            {/* Back Button for Transactional Flow */}
            <button className="text-secondary hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-bg-alternate">
              <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
            </button>
            <div className="font-h2-section text-h2-section text-primary uppercase tracking-tight hidden md:block">SWEET MEDICAL</div>
            <div className="font-h2-section-mobile text-h2-section-mobile text-primary uppercase tracking-tight md:hidden">SWEET MEDICAL</div>
          </div>
          {/* Wizard Progress Indicator */}
          <div className="flex items-center gap-2">
            <span className="font-body-sm text-body-sm text-text-secondary">Paso 2 de 3</span>
            <div className="flex gap-1">
              <div className="w-8 h-2 rounded-full bg-primary"></div>
              <div className="w-8 h-2 rounded-full bg-primary"></div>
              <div className="w-8 h-2 rounded-full bg-outline-variant"></div>
            </div>
          </div>
        </div>
      </header>

      <Outlet />
      <PiePagina />
    </div>
  );
}
