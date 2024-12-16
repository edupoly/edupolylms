import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useGettechnologyQuery, useLazyGettechnologyQuery, useUpdatetechnologyMutation } from '../../services/technology';

function Edittechnology() {

    var {tid} = useParams()
    var {data:technology,isLoading} = useGettechnologyQuery(tid)
    var [getTechFn] = useLazyGettechnologyQuery()
    var [updtecFn] = useUpdatetechnologyMutation()
    var navigate = useNavigate()
    
  return (
    <div>
        <h4>Edit Technology</h4> 
         <Formik
            initialValues={{
                 title: technology? technology.title : '', 
                 image: technology? technology.image : '', 
                 description: technology? technology.description : '' 
                }}
            validationSchema={Yup.object({
                title: Yup.string().required('Required'),
                image: Yup.string().required('Required'),
                description: Yup.string().required('Required'),
            })}
            onSubmit={async(updtech) => {
                console.log(updtech)
                await updtecFn({tid,updtech})
                await getTechFn(tid)
                navigate(`/admin/addconcept/${tid}`)
            }}
            >
            <Form>
                <div className=' mt-1'>
                    <Field name="title" type="text" placeholder='title' className="form-control mb-1" />
                    <ErrorMessage name="title" />
                </div>
                 <div>
                    <Field name="image" type="text" placeholder='image' className="form-control mb-1" />
                    <ErrorMessage name="image" />
                </div>
                 <div>
                    <Field name="description" type="text" placeholder='description' className="form-control mb-2"/>
                    <ErrorMessage name="description" />
                </div>
                <button type="submit" className='btn btn-success'>Update Technology</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Edittechnology