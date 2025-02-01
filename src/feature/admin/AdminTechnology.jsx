import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useGetAlltechnologiesQuery } from '../../services/technology'

function AdminTechnology() {

    var {data:technologies, isLoading} = useGetAlltechnologiesQuery()
    console.log(technologies)
  return (
    <div className='m-3'>
      <div className='d-flex justify-content-between m-3'>

      <h2 className='text-start '>Technologies</h2>
      <div className='text-end m-2'>
              <Link to={"/admin/addtechnology"}><button className='btn btn-primary'>+ADD TECHNOLOGY</button></Link> 
          </div>
      </div>
              <div className='d-flex flex-wrap justify-content-center '>
           {
                 technologies?.map((technology)=>{
                     return <div class="card m-3 p-2 " style={{width:"220px"}}>
                              <img src={technology.image} style={{width:"100%",height:"180px"}}  class="card-img-top " alt='Loading'/>
                              <div class="card-body">
                                <h4 class="card-title">{technology.title}</h4>
                                <p class="card-text">{technology.description}</p>
                                <Link to={`/admin/addconcept/${technology._id}`} class="btn btn-success">More info</Link>
                    </div>
           </div>
            })
        }
        </div>
         
        
    </div>
  )
}

export default AdminTechnology
