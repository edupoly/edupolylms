import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useGettopicdetailsQuery, useUpdatetopicMutation } from '../../services/technology';

function EditTopic() {
    var { tid, cid, toid } = useParams();
    
    var [updtopicFn] = useUpdatetopicMutation()
    var { data, isLoading } = useGettopicdetailsQuery({ tid, cid, toid });
    var navigate = useNavigate();

    var [topicInfo, setTopicInfo] = useState({
        title: '',
        shortheading: '',
        contents: ''
    });

    var [description, setDescription] = useState(EditorState.createEmpty());
    var [isError, setError] = useState(null);


    useEffect(() => {
        if (data) {
            const topic = data.concepts[0].topics[0];
            const blocksFromHTML = convertFromHTML(topic.contents || '');
            const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
        
            setTopicInfo({
                title: topic.title || '',
                shortheading: topic.shortheading || '',
                contents: topic.contents || ''
            });
            setDescription(EditorState.createWithContent(contentState));
        }
    }, [data]);

   
    var onChangeValue = (e) => {
        setTopicInfo({
            ...topicInfo,
            [e.target.name]: e.target.value
        });
    };

   
    var onEditorStateChange = (editorState) => {
        setDescription(editorState);
        var htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setTopicInfo({
            ...topicInfo,
            contents: htmlContent
        });
    };

    
    var edittopic = async (event) => {
        event.preventDefault();
        try {
            console.log('Updated topic data:', topicInfo);
            var data = await updtopicFn({topicInfo,tid,cid,toid})
            console.log("iiiiii",data)
            navigate(`/admin/addconcept/${tid}`);
        } catch (error) {
            console.error('Error updating topic:', error);
            setError('Failed to update topic. Please try again.');
        }
    };


    return (
        <div className='p-2'>
            <form onSubmit={edittopic}>
                <h2>Edit Topic</h2>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={topicInfo.title}
                        onChange={onChangeValue}
                        className="form-control"
                        placeholder="Title"
                    />
                </div>
                <div>
                    <label htmlFor="shortheading">Short Heading</label>
                    <input
                        type="text"
                        name="shortheading"
                        value={topicInfo.shortheading}
                        onChange={onChangeValue}
                        className="form-control"
                        placeholder="Short Heading"
                    />
                </div>
                <div>
                    <label htmlFor="contents">Description</label>
                    <Editor
                        editorState={description}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                    />
                    <textarea
                        readOnly
                        className="form-control mt-3"
                        value={topicInfo.contents}
                        rows="5"
                    />
                </div>
                {isError && <div className="errors text-danger">{isError}</div>}
                <div>
                    <button type="submit" className="btn btn-success mt-3">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTopic;
