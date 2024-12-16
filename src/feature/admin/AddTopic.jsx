import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAddtopicMutation, useLazyGettechnologyQuery } from '../../services/technology';
import { useNavigate, useParams } from 'react-router-dom';

 
function AddTopic() {

  var [addtopicFn] = useAddtopicMutation();
  var {tid,cid} = useParams()
  var navigate = useNavigate()
  

  let  [topicInfo, setTopicInfo] = useState({
        title: "",
        shortheadind: "",
        contents: ""
  })

  let editorState = EditorState.createEmpty();
  let [description, setDescription] = useState(editorState)
  let [isError, setError] = useState(null)

  let onChangeValue = (e)=>{
      setTopicInfo({
        ...topicInfo,
        [e.target.name]:e.target.value
      })
  }

  let onChangeValueshortheading = (e)=>{
      setTopicInfo({
        ...topicInfo,
        [e.target.name]:e.target.value
      })
  }


  let onEditorStateChange = (editorState) => {
    setDescription(editorState);
    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setTopicInfo((prev) => ({ ...prev, contents: htmlContent }));
  };
  
  


  let addtopic = async (event) => {
      try {
         event.preventDefault();
         await addtopicFn({topicInfo,tid,cid})
         navigate(`/admin/addconcept/${tid}`)
      } catch (error) {
         console.log("error in adding topic")
      }
  }

  return (
    <div className='p-2'>
      <form onSubmit={addtopic}>
       Add topic
       <div>
         <label htmlFor="title">Title</label>
         <input type="text" name='title' value={topicInfo.title} onChange={onChangeValue} className='form-control' placeholder='Title'/>
       </div>
       <div>
         <label htmlFor="shortheading">Short heading</label>
         <input type="text" name='shortheading' value={topicInfo.shortheading} onChange={onChangeValueshortheading} className='form-control' placeholder='Short Heading'/>
       </div>
       <div>
        <label htmlFor="contents">Description</label>
           <Editor
             editorState={description}
             toolbarClassName='toolbarClassName'
             wrapperClassName='wrapperClassName'
             editorClassName='editorClassName'
             onEditorStateChange={onEditorStateChange}
           />
           <textarea   
                readOnly 
                className="form-control mt-3" 
                rows="5" 
                value={draftToHtml(convertToRaw(description.getCurrentContent()))}
           />
       </div>
          {isError !== null && <div className='errors'>{isError}</div>}
       <div>
           <button type='submit' className='btn btn-success'>Submit</button>
       </div>
      </form>
    </div>
  )
}

export default AddTopic
