import React, { useState } from 'react';
import { useAddconceptMutation, useDeleteconceptMutation, useDeletetechnologyMutation, useDeletetopicMutation, useGettechnologyQuery, useLazyGettechnologyQuery, useUpdateconceptMutation } from '../../services/technology';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import Edittechnology from './Edittechnology';

function AddConcept() {

   var {tid} = useParams()
   var navigate = useNavigate()
   var {data:technology, isLoading} = useGettechnologyQuery(tid);
   var [getLazyTechFn] = useLazyGettechnologyQuery();
   var [deltechFn] = useDeletetechnologyMutation()
   var [addconceptFn] = useAddconceptMutation();
   var [updconceptFn] = useUpdateconceptMutation();
   var [delconceptFn] = useDeleteconceptMutation();
   var [deltopicFn] = useDeletetopicMutation();


  async function deleteTechnology(technology) {
     await deltechFn(technology._id)
     navigate("/admin")
  }

  async function addConcept() { 
     var conceptName = prompt()
     var concept = {conceptName}
     if(conceptName!==""){
         await addconceptFn({concept,id:tid})
         getLazyTechFn(tid)
      }
  }

  async function editConcept(conceptt) {
      console.log(conceptt)
      var conceptName = prompt();
      var concept = {conceptName}
      if(conceptName!==""){
            await  updconceptFn({concept,tid,cid:conceptt._id})
            getLazyTechFn(tid)
      }
  }

  async function deleteConcept(conceptt) {
    console.log(conceptt)
    await delconceptFn({tid,cid:conceptt._id})
     getLazyTechFn(tid)
  }

  async function deltopic(concept) {
    console.log(concept)
     var cid = concept._id
     var toid = concept.topics[0]._id
    await deltopicFn({tid,cid,toid})
    await getLazyTechFn(tid)
  }


  return (
    <div className='m-2 p-2 d-flex'>
        <div className='border w-25 me-2'>
          <div className='d-flex justify-content-between border m-1 p-2'>
            <div className='d-flex'>
              <h3>{technology?.title}</h3>
              <Link to={`/admin/addconcept/${tid}/edittechnology/`}><button className='btn btn-primary p-1 me-1'>edit</button></Link>
              <button className='btn btn-danger p-1' onClick={()=>deleteTechnology(technology)}>delete</button>
            </div>
            <div>
              <button className='btn btn-success me-1 p-1' onClick={()=>{addConcept()}}>+add concept</button>
            </div>
          </div>
          <div>
              {
                technology?.concepts?.map((concept)=>{
                    return <div className='border m-1 p-1'>
                              <div className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <h5>{concept.conceptName}</h5>
                                    <button className='btn btn-primary me-1 p-1'  onClick={()=>{editConcept(concept)}}>edit</button>
                                    <button className='btn btn-danger p-1'  onClick={()=>{deleteConcept(concept)}}>delete</button>
                                </div>
                                <div>
                                    <Link to={`/admin/addconcept/${tid}/addtopic/${concept._id}`}><button className='btn btn-success me-1 p-1' >+Add Topic</button></Link> 
                                </div>
                              </div>
                        
                                <div className='p-1 border m-1 d-flex'>
                                <Link to={`/admin/addconcept/${tid}/topicdetails/${concept._id}`} className="text-decoration-none text-dark"><h6>{concept.topics[0]?.shortheading}</h6></Link> 
                                    <Link to={`/admin/addconcept/${tid}/edittopic/${concept._id}/${concept?.topics[0]?._id}`}><button className='btn btn-warning p-1 me-1'>edit</button></Link>
                                    <button className='btn btn-danger p-1' onClick={(e)=>{deltopic(concept)}}>del</button>
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

export default AddConcept

