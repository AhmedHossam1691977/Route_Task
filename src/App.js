import React from 'react';
import './App.css';

import CustomerTable from './compnent/CustomerTable/CustomerTable.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TransactionGraph from './compnent/TransactionGraph/TransactionGraph.jsx';

export default function App() {


let routes = createBrowserRouter([
  {path:"/" ,element:<CustomerTable/>},
  {path:"TransactionGraph/:id" ,element:<TransactionGraph/>}

])



  return <>
  <RouterProvider router={routes}/>
  </>

}

//DB server run : npx json-server --watch db.json --port 5000