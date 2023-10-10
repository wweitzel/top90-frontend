import Goals from './pages/Goals';
import Error from './pages/Error';
import Goal from './pages/Goal';
import Fixture from './pages/Fixture';

import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {useEffect} from 'react';
import {getPreferredTheme, setTheme} from './lib/utils';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/goals" />,
    errorElement: <Error />,
  },
  {
    path: '/goals',
    element: <Goals />,
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
]);

function App() {
  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
