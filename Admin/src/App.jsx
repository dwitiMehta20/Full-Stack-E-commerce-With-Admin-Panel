/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import AdminNavbar from './components/AdminNavbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import ListProduct from './pages/ListProduct'
import Orders from "./pages/Orders"
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  //  it will check if token is available in local storage , if not then it will set it as empty string ''
  // and useEffect will set token
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  // token is coming from backend response generated through JWT and here it is used for authentication

  // as after relaoding page admin gets logged out automatically , we'll make sure to store tokenn locally.
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])


  return (
    <div className='bg-gray-50 min-h-screen'>

      <ToastContainer />
      {
        // settoken func.. is passed as a prop which is then destructured in Login.jsx for setting it's value.
        token === '' ? <Login setToken={setToken} />
          : <>
            <AdminNavbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw , 25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<AddProduct token={token} />} />
                  <Route path='/list' element={<ListProduct token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }

    </div>
  )
}

export default App