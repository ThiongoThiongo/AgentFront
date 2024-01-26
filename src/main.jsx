import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store';
import {Provider} from 'react-redux'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PrivateRouteSupervisor from './components/PrivateRouteOfficer.jsx';
import Home from './screens/Home.jsx'
import Agent from './screens/Agent.jsx'
import Login from './screens/Login.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
       <Route path='/' element={<App/>}>
               <Route index = {true} path='/' element={<Home/>} />     
              <Route index = {true} path='/login' element={<Login/>} />
               
               <Route path='' element={<PrivateRouteSupervisor/>}>
              
              <Route index = {true} path='/dashboard' element={<Agent/>} />

              </Route> 
             
     
       </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

  <React.StrictMode>
     <RouterProvider router={router}/>
   </React.StrictMode>
   </Provider>
)
