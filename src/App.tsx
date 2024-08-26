import Header from './components/Header';
import {ThemeProvider} from './hooks/useTheme';
import Error from './pages/Error';
import Fixture from './pages/Fixture';
import Fixtures from './pages/Fixtures';
import Goal from './pages/Goal';
import Goals from './pages/Goals';
import Settings from './pages/Settings';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translations from './i18n';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

i18n.use(initReactI18next).init({resources: translations, lng: navigator.language});

const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      {
        path: '/',
        element: <Goals />,
        errorElement: <Error />,
      },
      {
        path: '/fixtures',
        element: <Fixtures />,
        errorElement: <Error />,
      },
      {
        path: '/settings',
        element: <Settings />,
        errorElement: <Error />,
      },
      {
        path: '/goals/:goalId',
        element: <Goal />,
        errorElement: <Error />,
      },
      {
        path: '/fixtures/:fixtureId',
        element: <Fixture />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
