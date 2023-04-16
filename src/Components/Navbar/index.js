import React, { useEffect, useState } from 'react'
import "./nav.css"
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
const Navbar = (props) => {
    const navigate = useNavigate()
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className='col-7 logoname' onClick={() => navigate("/")}>
                        <h2 className="navbar-brand">Main Admin</h2>
                    </div>
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
                            <li className="nav-item" onClick={() => navigate("/")}>
                                <a className={props.Home ? "active nav-link" : "nav-link"}>Home</a>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id={props.Status === "Users Status" ? "" : "active"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {props.Status}
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a className={props.ApprovedUser ? "active dropdown-item" : "dropdown-item"} onClick={() => navigate("/ApprovedUser")}>Approved Users</a></li>
                                    <li><a className={props.PendingUser ? "active dropdown-item" : "dropdown-item"} onClick={() => navigate("/PendingUser")}>Pending Users</a></li>
                                    <li><a className={props.RejectedUser ? "active dropdown-item" : "dropdown-item"} onClick={() => navigate("/RejectedUser")}>Rejected Users</a></li>
                                </ul>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id={props.Pstatus === "Post Status" ? "" : "active"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {props.Pstatus}
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a className={props.ApprovedPost ? "active dropdown-item" : "dropdown-item"} onClick={() => navigate("/ApprovedPost")}>Approved Posts</a></li>
                                    <li><a className={props.PendingPost ? "active dropdown-item" : "dropdown-item"} onClick={() => navigate("/PendingPost")}>Pending Posts</a></li>
                                    <li><a className={props.RejectedPost ? "active dropdown-item" : "dropdown-item"} onClick={() => navigate("/RejectedPost")}>Rejected Posts</a></li>
                                </ul>
                            </li>

                            <li className="nav-item pl-0 " onClick={() => {
                                signOut(auth).then(() => {
                                    navigate("/Login")
                                }).catch((error) => { })
                            }}>
                                <a className="nav-link" >Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Navbar 