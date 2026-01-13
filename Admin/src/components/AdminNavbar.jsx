/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from "../assets/assets.js"



const AdminNavbar = ({setToken}) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <img className='w-36' src={assets.logo} alt="" />
            <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2  sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>LogOut</button>
        </div>
    )
}

export default AdminNavbar