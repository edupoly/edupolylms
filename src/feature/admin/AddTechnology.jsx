import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddtechnologyMutation } from '../../services/technology';
import { useNavigate } from 'react-router-dom';


function AddTechnology() {

       var [addtechFn] = useAddtechnologyMutation()
       var navigate = useNavigate()

        return (
          <div className='border m-2 p-3'>
            <h1>Add Technology</h1>
          <Formik
            initialValues={{ title: '', image: '', description: '' }}
            validationSchema={Yup.object({
              title: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
              image: Yup.string().required('Required'),
              description: Yup.string().required('Required'),
            })}
            onSubmit={async(values) => {
                var data = await addtechFn(values)
                if(data.data.id){
                   navigate(`/admin/addconcept/${data.data.id}`)
                   console.log(data)
                }
                else{
                  console.log("not navigated")
                }
            }}
          >
            <Form>
              <div>
              <label htmlFor="title">Technology Title</label>
              <Field name="title" type="text" className="m-2"/>
              <ErrorMessage name="title" />
              </div>
              <div>
              <label htmlFor="image">Technology Image</label>
              <Field name="image" type="text" className="m-2"/>
              <ErrorMessage name="image" />
              </div>
              <div>
              <label htmlFor="description">Technology description</label>
              <Field name="description" type="text" className="m-2"/>
              <ErrorMessage name="description" />
              </div>
              <button type="submit" className='btn btn-success mt-2'>ADD TECHNOLOGY</button>
            </Form>
          </Formik>
          </div>
        );
}

export default AddTechnology

