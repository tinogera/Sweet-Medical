import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page heading', () => {
  render(<App />);
  const heading = screen.getByText(/Búsqueda de Turnos/i);
  expect(heading).toBeInTheDocument();
});
