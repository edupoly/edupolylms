import React, { useState } from 'react';
import { useAddconceptMutation, useDeleteconceptMutation, useDeletetechnologyMutation, useDeletetopicMutation, useGettechnologyQuery, useLazyGettechnologyQuery, useUpdateconceptMutation } from '../../services/technology';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import Edittechnology from './Edittechnology';

function AddConcept() {

   var {tid} = useParams()
   var navigate = useNavigate()
   var {data:technology, isLoading} = useGettechnologyQuery(tid);
   console.log("tid",tid)
   console.log("data",technology)
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
                  console.log("con",concept)
                  // console.log("cid",concept.topics[0]._id)
                    return <div className='border m-1 p-1'>
                              <div className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <b>{concept.conceptName}</b>
                                    <i class="bi bi-pen pe-2 text-success" style={{width:"35px"}}  onClick={()=>{editConcept(concept)}}></i>
                                     
                                    <i class="bi bi-trash   p-2 text-danger" style={{width:"45px", float:"start"}} onClick={()=>{deleteConcept(concept)}}></i>
                                    {/* <button className='btn btn-danger p-1'  >delete</button> */}
                                </div>
                                <div>
                                    <Link to={`/admin/addconcept/${tid}/addtopic/${concept._id}`}><button className='btn btn-success me-1 p-1' >+Add Topic</button></Link> 
                                </div>
                              </div>
                        
                                <div className='p-1 border m-1 d-flex'>
                                <Link to={`/admin/addconcept/${tid}/topicdetails/${concept._id}/${concept.topics[0]?._id}`} className="text-decoration-none text-dark"><i>{concept.topics[0]?.shortheading}</i></Link> 
                                    <Link to={`/admin/addconcept/${tid}/edittopic/${concept._id}`}><i class="bi bi-pen d-inline-block pe-2 text-success" style={{width:"35px"}}></i></Link>
                                    <i class="bi bi-trash  d-inline-block p-2 text-danger " style={{width:"35px"}}  onClick={(e)=>{deltopic(concept)}}></i>
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

