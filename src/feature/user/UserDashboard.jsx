import React from 'react'
import { Outlet } from 'react-router-dom'

function UserDashboard() {
  return (
    <div className='p-2 m-1'>
   <b className='fs-1'>USER DASHBOARD</b>
       <Outlet></Outlet>
    </div>
  )
}

export default UserDashboard
