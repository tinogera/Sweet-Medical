import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './AppLayout';

describe('AppLayout', () => {
  it('renders Header, outlet content and PiePagina for the home route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<div data-testid="home-content">Home</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toHaveTextContent('SWISS MEDICAL');
    expect(screen.getByTestId('home-content')).toHaveTextContent('Home');
    expect(screen.getByRole('contentinfo')).toHaveTextContent(/Swiss Medical Group/i);
  });

  it('renders Header, outlet content and PiePagina for a nested nav route', () => {
    render(
      <MemoryRouter initialEntries={['/servicios']}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/servicios" element={<div data-testid="services-content">Servicios</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toHaveTextContent('SWISS MEDICAL');
    expect(screen.getByTestId('services-content')).toHaveTextContent('Servicios');
    expect(screen.getByRole('contentinfo')).toHaveTextContent(/Swiss Medical Group/i);
  });
});
