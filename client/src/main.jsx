import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Profile from './Profile.jsx'
import Home from './Home.jsx'
import PlanInfo from './PlanInfo.jsx'

const router = createHashRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
      {
        path: "/new_plan_info",
        element: <PlanInfo/>,
  
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)