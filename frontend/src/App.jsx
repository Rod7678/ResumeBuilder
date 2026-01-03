import { useState } from 'react'
import './App.css'
import Header from './components/Headers/Header.jsx'
import UserForm from './components/Form/UserForm.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout.jsx'
import ProfessionForm from './components/Form/ProfessionForm.jsx'

function App() {
  const router = createBrowserRouter([
    {path: '/', element: <RootLayout/>,
      children: [
        { index : true , element: <UserForm />},
        { 
          path: '/professinalForm',
          element: <ProfessionForm />
        }
      ]
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
