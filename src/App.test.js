import {render, screen} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import App from './App';

const testQueryClient = new QueryClient();

test('renders loading indicator', () => {
  render(<QueryClientProvider client={testQueryClient}><App /></QueryClientProvider>);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
