import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className='border m-2 p-2'>
         <h2>Admin Dashboard</h2>
         <Outlet></Outlet>
    </div>
  )
}

export default AdminDashboard
