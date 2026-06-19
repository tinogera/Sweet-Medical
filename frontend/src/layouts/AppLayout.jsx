import { Outlet } from 'react-router-dom';
import Header from '../components/headers/Header';
import PiePagina from '../components/piePagina/PiePagina';

export default function AppLayout() {
  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased font-body-main selection:bg-primary-container selection:text-white min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <PiePagina />
    </div>
  );
}
