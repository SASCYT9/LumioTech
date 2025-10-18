import { render, screen } from '@testing-library/react';
import LumioTech from './LumioTech';

test('renders LumioTech component without crashing', () => {
  render(<LumioTech />);
  const homePageElement = screen.getByText(/Кузня Майбутнього/i);
  expect(homePageElement).toBeInTheDocument();
});