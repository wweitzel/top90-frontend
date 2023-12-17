import Error from './pages/Error';
import Fixture from './pages/Fixture';
import Goal from './pages/Goal';
import Goals from './pages/Goals';

import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

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
  return <RouterProvider router={router} />;
}

export default App;
