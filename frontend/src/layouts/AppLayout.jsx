import { Outlet } from 'react-router-dom';
import Header from '../components/headers/Header';
import PiePagina from '../components/piePagina/PiePagina';

export default function AppLayout() {
  return (
    <>
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <PiePagina />
    </>
  );
}
