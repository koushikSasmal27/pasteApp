import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import Paste from './components/Paste'
import Pastes from './components/Pastes'

const router=createBrowserRouter(
  [
    {
      path:'/',
      element: <Nav/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
           path:'paste/:id',
          element:<Paste/>
        },
        {
          path:'pastes',
          element:<Pastes/>
        }
      ]
    }
  ]
)
const App = () => {
  return (
    <div>
          <RouterProvider router={router} />
    </div>
  )
}

export default App
