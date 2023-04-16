import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./card.css"
const PostCard = (props) => {
  const navigate = useNavigate()

  return (
    <>
      <div class="col-md-6 col-lg-4">
        <div class="card m-3">
          <img src={props.img} className='imgcard'  onClick={()=>navigate(`/PostDetails/${props.id}`)}/>
          <div class="card-body">
            <p className='date'>{props.date}</p>
            <h3 class="card-title">{props.title}</h3>
            <p class="card-text">{props.des.slice(0, 20)}{
            }</p>
            <div className='mt-2 d-flex row justify-content-between'>
              <h5>Status</h5>
              {props.status === "Approved" && <h5 className='Approved'>Approved</h5>}
              {props.status === "Pending" && <h5 className='Pending'>Pending</h5>}
              {props.status === "Rejected" && <h5 className='Rejected'>Rejected</h5>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostCard