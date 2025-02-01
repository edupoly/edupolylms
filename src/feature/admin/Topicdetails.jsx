import React, { useEffect, useState } from 'react';
import { useTopicdetailsQuery } from '../../services/technology';
import { Link, Outlet, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

function Topicdetails() {
  const { tid, cid, topicId } = useParams();
  const { data: technology } = useTopicdetailsQuery({ tid, cid });
  const [topicdetails, setTopicdetails] = useState([]);

  useEffect(() => {
    if (technology) {
      const validContents = technology?.concepts?.[0]?.topics?.[0]?.contents?.filter(
        (content) => typeof content.content === "string"
      );
      setTopicdetails(validContents || []);
    }
  }, [technology]);

  function addcontent() {
    console.log("add");
  }

  return (
    <div>
      <div className="d-flex justify-content-between btn">
        <h3>Topic Details</h3>
        <Link
          to={`/admin/addconcept/${technology?._id}/topicdetails/${technology?.concepts[0]?._id}/${topicId}/addcontent`}
        >
          <button className="btn btn-success">Add Content</button>
        </Link>
      </div>
      <Outlet />
      <p>
        {topicdetails && topicdetails.length > 0 ? (
          topicdetails.map((content) => (
            <div className="border m-2" key={content._id}>
              <div className="d-flex justify-content-between">
                <div>
                  <h2>{content.shortheading} </h2>
                </div>
                <div>
                  <Link
                    to={`/admin/addconcept/${tid}/edittopic/${cid}/${topicId}/${content._id}/editcontent`}
                  >
                    <i class="bi bi-pen d-inline-block pe-2 text-success" style={{width:"35px"}}></i>
                  </Link>
                  <i class="bi bi-trash  d-inline-block p-2 text-danger " style={{width:"45px"}}></i>
                </div>
              </div>
              <div>
                {typeof content.content === "string"
                  ? parse(content.content)
                  : "Invalid content format"}
              </div>
            </div>
          ))
        ) : (
          <p>No content available for this topic.</p>
        )}
      </p>
    </div>
  );
}

export default Topicdetails;

