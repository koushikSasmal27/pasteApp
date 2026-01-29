import React from 'react'
import { NavLink, Outlet } from "react-router";
const Nav = () => {
  return (
    <div>
      <nav className='bg-indigo-600 text-white shadow-md'>
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-white text-xl font-extrabold tracking-wide">
        PasteApp
      </h1>
          <div className='flex gap-8 '>
            <NavLink to='/' className={({ isActive }) => isActive ? 'border-b-2  border-gray-300 hover:border-indigo-500' : ''}>Home</NavLink>
            <NavLink to='/pastes' className={({ isActive }) => isActive ? 'border-b-2  border-gray-300 hover:border-indigo-500' : ''}>Pastes</NavLink>
          </div>

        </div>
      </nav>
      <Outlet/>
    </div>

  )
}

export default Nav
