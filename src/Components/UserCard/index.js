import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./usercard.css"

const UserCard = (props) => {
    const navigate = useNavigate()


    return (
        <>
            <div class="col-md-6 col-lg-4">
                <div class="card m-3">
                    <div className='d-flex justify-content-center align-content-center w-100'>
                        <img src={props.img} className='profile rounded-1'/>
                    </div>
                    <div class="card-body">
                        <div className='mt-2'>
                            <h5 className='name'>Full Name:</h5>
                            <h5>{props.name}</h5>
                        </div>
                        <div className='mt-3'>
                            <h5 className='name'>Email Address:</h5>
                            <h5>{props.Email}</h5>
                        </div>
                        <div className='mt-3 mb-4'>
                            <h5 className='name'>Contact Number:</h5>
                            <h5>{props.num}</h5>
                        </div>

<div>
    <button className='w-100 btnview' onClick={() => navigate(`/UserDetails/${props.uid}`)}>View</button>
</div>
                        {/* <div className='mt-2 d-flex row justify-content-between'>
                            <h5>Status</h5>
                            {props.status === "Approved" && <h5 className='Approved'>Approved</h5>}
                            {props.status === "Pending" && <h5 className='Pending'>Pending</h5>}
                            {props.status === "Rejected" && <h5 className='Rejected'>Rejected</h5>}
                        </div> */}
                    </div>
                </div>
            </div>
        </>)
}

export default UserCard