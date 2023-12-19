import './mocks/matchMedia.ts';

import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

test('renders the app with no errors', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
