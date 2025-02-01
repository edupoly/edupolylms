import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAddcontentMutation, useAddtopicMutation, useLazyGettechnologyQuery } from '../../services/technology';
import { useNavigate, useParams } from 'react-router-dom';

 
function AddContent() {

  var [addtopicFn] = useAddtopicMutation();
  var [addcontentFn] = useAddcontentMutation()
  var {tid,cid,topicId} = useParams()
  console.log(tid,cid,topicId)
  var navigate = useNavigate()
  

  let  [topicInfo, setTopicInfo] = useState({
        title: "",
        shortheading: "",
        type:"",
        content: ""
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


  let onChangeValuetype = (e)=>{
      setTopicInfo({
        ...topicInfo,
        [e.target.name]:e.target.value
      })
  }


  let onEditorStateChange = (editorState) => {
    setDescription(editorState);
    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setTopicInfo((prev) => ({ ...prev, content: htmlContent }));
  };
  
  


  let addcontent = async (event) => {
      try {
         event.preventDefault();
         console.log("topicinfo",topicInfo)
        var res =  await addcontentFn({topicInfo,tid,cid,topicId})
        console.log("resss",res)
        //  await addtopicFn({topicInfo,tid,cid})
         navigate(`/admin/addconcept/${tid}`)
      } catch (error) {
         console.log("error in adding topic")
      }
  }

  
  return (
    <div className='p-2'>
      <form onSubmit={addcontent}>
       Add topic
       <div>
         <label htmlFor="title">Title</label>
         <input type="text" name='title' value={topicInfo.title} onChange={onChangeValue} className='form-control' placeholder='Title'/>
       </div>
       <div>
         <label htmlFor="shortheadind">Short heading</label>
         <input type="text" name='shortheading' value={topicInfo.shortheading} onChange={onChangeValueshortheading} className='form-control' placeholder='Short Heading'/>
       </div>
       <div>
         <label htmlFor="type">Type</label>
         <select type="text" name='type' value={topicInfo.type} onChange={onChangeValuetype} className='form-control' placeholder='Type'>
            <option value="">select content type</option>
            <option value="Description">description</option>
            <option value="Video">video</option>
            <option value="Practise-questions">Practise-questions</option>
            <option value="Assignments">Assignments</option>
            <option value="Quiz">Quiz</option>
            <option value="Projects">Projects</option>
         </select>
        
       </div>
       <div>
        <label htmlFor="content">Description</label>
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

export default AddContent
