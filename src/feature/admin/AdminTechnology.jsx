import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useGetAlltechnologiesQuery } from '../../services/technology'

function AdminTechnology() {

    var {data:technologies, isLoading} = useGetAlltechnologiesQuery()
    console.log(technologies)
  return (
    <div className='m-2 p-2 border '>
      <div>
         <div>Technologies</div>
      </div>
        
        <div className='d-flex'>
          <div className='border m-2 p-2 d-flex flex-column align-items-center justify-content-center bg-warning'>
              <Link to={"/admin/addtechnology"}><button className='btn btn-dark'>+ADD TECHNOLOGY</button></Link> 
          </div>
         {
            technologies?.map((technology)=>{
                return <div className='border m-2 p-2 d-flex flex-column align-items-center'>
                            <div className='d-flex'><h5>Technology:</h5><h5>{technology.title}</h5></div>
                            <div><img src={technology.image} alt="Loading" style={{width:"140px"}} /></div>
                            <div>{technology.description}</div>
                            <Link to={`/admin/addconcept/${technology._id}`}><button className='btn btn-success'>Technology details</button></Link>
                      </div>
            })
        }
        </div>
    </div>
  )
}

export default AdminTechnology
