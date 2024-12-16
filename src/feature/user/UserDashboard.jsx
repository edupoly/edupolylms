import React from 'react'
import { Outlet } from 'react-router-dom'

function UserDashboard() {
  return (
    <div className='p-2 border m-1'>
       USER DASHBOARD
       <Outlet></Outlet>
    </div>
  )
}

export default UserDashboard
