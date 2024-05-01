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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        element: <Media _id={''} title={''} rating={0} type={''} review={''} imgUrl={''} onDelete={function (string: any): void {
          throw new Error('Function not implemented.');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } } onEdit={function (updatedMedia: unknown): void {
          throw new Error('Function not implemented.');
        } } />,
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
