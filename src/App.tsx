import Header from './components/Header';
import {ThemeProvider} from './hooks/useTheme';
import Error from './pages/Error';
import Fixture from './pages/Fixture';
import Fixtures from './pages/Fixtures';
import Goal from './pages/Goal';
import Goals from './pages/Goals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter(
  [
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
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_fetcherPersist: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider
        future={{
          v7_startTransition: true,
        }}
        router={router}
      />
    </ThemeProvider>
  );
}

export default App;
