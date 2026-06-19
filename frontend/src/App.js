import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import BusquedaServicio from './features/busquedaServicios/BusquedaServicio';
import BusquedaMedico from './features/busquedaMedico/BusquedaMedico';
import SeleccionFecha from './features/seleccionFecha/SeleccionFecha';
import { Link } from 'react-router-dom';
import RouteProgress from './components/barraProgreso/RouteProgress'; // <-- NUEVO

function App() {
  return (
    <Router>
      <RouteProgress /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<BusquedaServicio />} />
        <Route path="/medicos" element={<BusquedaMedico />} />
        <Route path="/fecha" element={<SeleccionFecha />} />
      </Routes>
    </Router>
  );
}


export default App;
