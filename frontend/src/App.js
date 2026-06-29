import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import MisTurnos from './features/misTurnos/MisTurnos';
import BusquedaServicio from './features/busquedaServicios/BusquedaServicio';
import BusquedaMedico from './features/busquedaMedico/BusquedaMedico';
import SeleccionFecha from './features/seleccionFecha/SeleccionFecha';
import TurnosUsuario from './features/turnosUsuario/turnosUsuario';
import AppLayout from './layouts/AppLayout';
import TransactionalLayout from './layouts/TransactionalLayout';
import ConfirmacionTurno from './features/confirmacionTurno/ConfirmacionTurno';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<BusquedaServicio />} />
        <Route path="/medicos" element={<BusquedaMedico />} />
        <Route path="/mis-turnos" element={<TurnosUsuario />} />
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
      <AppRoutes />
    </Router>
  );
}

export default App;
