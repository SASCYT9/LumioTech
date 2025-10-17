import { render, screen } from '@testing-library/react';
import App from './App';

test('renders LumioTech component', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Lumio/i);
  expect(linkElements.length).toBeGreaterThan(0);
});