import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { ApprovedPost, ApprovedUser, Home, Login, PendingPost, PendingUser, PostDetails, RejectedPost, RejectedUser, UserDetails } from '../../Pages'


const RouterNavigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/ApprovedPost' element={<ApprovedPost />} />
                <Route path='/ApprovedUser' element={<ApprovedUser />} />
                <Route path='/PendingPost' element={<PendingPost />} />
                <Route path='/PendingUser' element={<PendingUser />} />
                <Route path='/RejectedPost' element={<RejectedPost />} />
                <Route path='/RejectedUser' element={<RejectedUser />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/UserDetails/:id' element={<UserDetails />} />
                <Route path='/PostDetails/:id' element={<PostDetails />} />
          
            </Routes>
        </BrowserRouter>
    )
}
export default RouterNavigation