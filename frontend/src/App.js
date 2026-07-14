import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import MisTurnos from './features/misTurnos/MisTurnos';
import BusquedaServicio from './features/busquedaServicios/BusquedaServicio';
import BusquedaMedico from './features/busquedaMedico/BusquedaMedico';
import SeleccionFecha from './features/seleccionFecha/SeleccionFecha';
import ConfirmacionTurno from './features/confirmacionTurno/ConfirmacionTurno';
import AppLayout from './layouts/AppLayout';
import TransactionalLayout from './layouts/TransactionalLayout';
import { BusquedaProvider } from './context/BusquedaContext';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import NotFound  from './features/notFound/NotFound'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mis-turnos/:id" element={<MisTurnos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<TransactionalLayout />}>
        <Route path="/fecha" element={<SeleccionFecha />} />
        <Route path="/medicos" element={<BusquedaMedico />} />
        <Route path="/servicios" element={<BusquedaServicio />} />
        <Route path="/turno" element={<ConfirmacionTurno />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <BusquedaProvider>
        <AppRoutes />
      </BusquedaProvider>
    </Router>
  );
}

export default App;
