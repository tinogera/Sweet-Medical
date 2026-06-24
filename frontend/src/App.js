import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import MisTurnos from './features/misTurnos/MisTurnos';
import BusquedaServicio from './features/busquedaServicios/BusquedaServicio';
import BusquedaMedico from './features/busquedaMedico/BusquedaMedico';
import SeleccionFecha from './features/seleccionFecha/SeleccionFecha';
import NotFound from './features/notFound/NotFound';
import AppLayout from './layouts/AppLayout';
import TransactionalLayout from './layouts/TransactionalLayout';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mis-turnos" element={<MisTurnos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<TransactionalLayout />}>
        <Route path="/fecha" element={<SeleccionFecha />} />
        <Route path="/medicos" element={<BusquedaMedico />} />
        <Route path="/servicios" element={<BusquedaServicio />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
