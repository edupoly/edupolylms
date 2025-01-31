import React, { useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGettopicdetailsQuery,
  useUpdatetopicMutation,
} from "../../services/technology";

function EditTopic() {
  const { tid, cid, topicId, contentId } = useParams();
  const [updtopicFn] = useUpdatetopicMutation();
  const { data, isLoading } = useGettopicdetailsQuery({
    tid,
    cid,
    topicId,
    contentId,
  });

  console.log("opoio",data)
  const navigate = useNavigate();

  const [topicInfo, setTopicInfo] = useState({
    title: "",
    shortheading: "",
    content: "",
    type: "",
  });

  const [description, setDescription] = useState(EditorState.createEmpty());
  const [isError, setError] = useState(null);

  useEffect(() => {
    if (data) {
      const blocksFromHTML = convertFromHTML(data.content || "");
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      setTopicInfo({
        title: data.title || "",
        shortheading: data.shortheading || "",
        content: data.content || "",
        type: data.type || "",
      });
      setDescription(EditorState.createWithContent(contentState));
    }
  }, [data]);

  const onChangeValue = (e) => {
    setTopicInfo({
      ...topicInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
    const htmlContent = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setTopicInfo({
      ...topicInfo,
      content: htmlContent,
    });
  };

  const edittopic = async (event) => {
    event.preventDefault();
    try {
      console.log("Updated topic data:", topicInfo);
      await updtopicFn({ topicInfo, tid, cid, topicId, contentId });
      navigate(`/admin/addconcept/${tid}`);
    } catch (error) {
      console.error("Error updating topic:", error);
      setError("Failed to update topic. Please try again.");
    }
  };

  return (
    <div className="p-2">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
              value={topicInfo.content}
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
      )}
    </div>
  );
}

export default EditTopic;




