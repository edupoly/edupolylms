import React, { useState } from 'react';
import { useAddtopicMutation } from '../../services/technology';
import { useNavigate, useParams } from 'react-router-dom';

function AddTopicc() {

  var [addtopicFn] = useAddtopicMutation();
  var {tid, cid} = useParams();
  var navigate = useNavigate();

  let [topicInfo, setTopicInfo] = useState({
    title: "",
    shortheading: "",
  });

 

  let onChangeValue = (e) => {
    setTopicInfo({
      ...topicInfo,
      [e.target.name]: e.target.value
    });
  };

  let addtopic = async (event) => {
    try {
      event.preventDefault();
      await addtopicFn({ topicInfo, tid, cid });
      navigate(`/admin/addconcept/${tid}`);
    } catch (error) {
      console.log("error in adding topic");
    }
  };

  return (
    <div className='p-2'>
      <form onSubmit={addtopic}>
        <h3>Add Topic</h3>
        <div>
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            name='title' 
            value={topicInfo.title} 
            onChange={onChangeValue} 
            className='form-control' 
            placeholder='Title' 
          />
        </div>
        <div>
          <label htmlFor="shortheading">Short Heading</label>
          <input 
            type="text" 
            name='shortheading' 
            value={topicInfo.shortheading} 
            onChange={onChangeValue} 
            className='form-control' 
            placeholder='Short Heading' 
          />
        </div>
        <div>
          <button type='submit' className='btn btn-success'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddTopicc;
