import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Manufacturer from './Components/Actors/Manufacturer/Manufacturer';
import Prescriber from './Components/Actors/Prescriber';
import Supplier from './Components/Actors/Supplier';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  
  {
    path: "/Manufacturer",
    element: <Manufacturer />
  },
  {
    path: "/Prescriber",
    element: <Prescriber />
  },
  {
    path: "/Distributer",
    element: <Supplier />
  }
]);
root.render(
  <React.StrictMode>
       <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
