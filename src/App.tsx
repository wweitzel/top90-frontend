import Goals from './pages/Goals';
import Error from './pages/Error';
import Goal from './pages/Goal';

import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

export const BASE_URL = process.env.REACT_APP_TOP90_BASE_URL || 'http://localhost:3000';

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
