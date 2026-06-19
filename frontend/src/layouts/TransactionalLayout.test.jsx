import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TransactionalLayout from './TransactionalLayout';

describe('TransactionalLayout', () => {
  it('renders the transactional header, outlet content and PiePagina for /fecha', () => {
    render(
      <MemoryRouter initialEntries={['/fecha']}>
        <Routes>
          <Route element={<TransactionalLayout />}>
            <Route path="/fecha" element={<div data-testid="fecha-content">Seleccioná la Fecha</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toHaveTextContent('SWISS MEDICAL');
    expect(screen.getByText(/Paso 2 de 3/i)).toBeInTheDocument();
    expect(screen.getByTestId('fecha-content')).toHaveTextContent('Seleccioná la Fecha');
    expect(screen.getByRole('contentinfo')).toHaveTextContent(/Swiss Medical Group/i);
  });
});
