import React from 'react'
import { useGettechnologyQuery } from '../../services/technology'
import { Link, Outlet, useParams } from 'react-router-dom'

function Technologydetails() {
   var {tid} = useParams()
   var {data:technology,isLoading} = useGettechnologyQuery(tid)
   console.log(technology,tid)

  
   return (
    <div className='m-2 p-2 d-flex'>
       <div className='border w-25 me-2'>
          <div className='d-flex justify-content-between border m-1 p-2'>
            <div className='d-flex'>
              <h3>{technology?.title}</h3>
            </div>
          </div>
         <div>
              {
                technology?.concepts?.map((concept)=>{
                    return <div className='border m-1 p-1'>
                             <div className='d-flex justify-content-between'>
                                <div>
                                    <h5>{concept.conceptName}</h5>
                                </div>
                             </div>
                                <div className='p-1 border m-1 d-flex'>
                                        <Link to={`/technologydetails/${tid}/${concept._id}/${concept.topics[0]._id}`} className="text-decoration-none text-dark"><h6>{concept.topics[0]?.shortheading}</h6></Link> 
                                </div>
                           </div>
                })
              }
         </div>
       </div>

       <div className='w-75 border p-2'>
           <Outlet></Outlet>
       </div>

    </div>
  );
}

export default Technologydetails
