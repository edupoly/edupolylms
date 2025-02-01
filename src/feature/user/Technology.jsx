import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useGetAlltechnologiesQuery } from '../../services/technology'

function Technology() {

    var {data:technologies, isLoading} = useGetAlltechnologiesQuery()
    console.log(technologies)

  return (
    <div className='m-2 p-2 border '>
      <b className='fs-1'>

        Technologies
      </b>
        <div className='d-flex'>
         {
            technologies?.map((technology)=>{
                return  <div class="card m-3 p-2 " style={{width:"220px"}}>
                                              <img src={technology.image} style={{width:"100%",height:"180px"}}  class="card-img-top " alt='Loading'/>
                                              <div class="card-body">
                                                <h4 class="card-title">{technology.title}</h4>
                                                <p class="card-text">{technology.description}</p>
                                                {/* <Link to={`/admin/addconcept/${technology._id}`} class="btn btn-success">More info</Link> */}
          <Link to={`/technologydetails/${technology._id}`}><button className='btn btn-success'>More details</button></Link>
                                    </div>
                                    </div>
            })
          }
        </div>
    </div>
  )
}

export default Technology
