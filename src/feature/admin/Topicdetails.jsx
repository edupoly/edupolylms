import React, { useState } from 'react'
import { useTopicdetailsQuery } from '../../services/technology'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'

function Topicdetails() {
   var {tid,cid}  = useParams()
   var {data:topic} = useTopicdetailsQuery({tid,cid})
   const htmlstr = topic?.concepts[0]?.topics[0]?.contents
  return (
    <div>
        <h3>Topic Details</h3>
           <p>
             {
              (topic?.concepts[0].topics.length>0)? parse(htmlstr) : <p>No Topic is added to this concept</p>
             }
            </p> 
    </div>
  )
}

export default Topicdetails
