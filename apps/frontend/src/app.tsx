//import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './signup';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import MediaGenius from './homepage';
import LogIn from './login';
import Media from './media';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/login' />,
    errorElement: <ErrorPage />,
  },
  
  {
    path: "/media",
    element: <MediaGenius />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"media/:id",
        element: <Media />,
      },
    ],
  },
  
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/login",
    element: <LogIn />,
    errorElement: <ErrorPage />,
  }
]);


function App() {

  return (
    <div className = "container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
