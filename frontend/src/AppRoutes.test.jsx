import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';

describe('AppRoutes', () => {
  it('renders the home page under AppLayout', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText(/Búsqueda de Turnos/i)).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the services page under AppLayout', () => {
    render(
      <MemoryRouter initialEntries={['/servicios']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText(/¿Qué servicio estás buscando?/i)).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the medicos page under AppLayout', () => {
    render(
      <MemoryRouter initialEntries={['/medicos']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText(/¿A quién estás buscando?/i)).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the fecha page under TransactionalLayout', () => {
    render(
      <MemoryRouter initialEntries={['/fecha']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Paso 2 de 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Seleccioná la Fecha/i)).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
