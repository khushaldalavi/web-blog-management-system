import React, { useEffect } from 'react'
import AdnimNavBar from '../Navbar/AdnimNavBar'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'


import { useUser } from '../../UserInfo/UserContext'
import UserHome from './UserHome';
import UserViewBlogs from './UserViewBlogs';
import MyBlogs from '../BLog/MyBlogs';
import UserNavbar from './UserNavbar';
import AddBlog from '../BLog/AddBlog';
import EditBlog from '../BLog/EditBlog';
import ProtectedRoute from '../../Auth/ProtectedRoute';

const Admin= () => {
//   const location = useLocation();
//   const user = location.state?.user;


let navigate= useNavigate();


let {user} = useUser;


  return (
    <>
       <UserNavbar user={user}/>
       
        <Routes>
        <Route path="" element={<Navigate to="userHome" />} /> 
        <Route path="/userHome" element={<ProtectedRoute><UserHome user={user} /></ProtectedRoute>} />
        <Route path="/veiwAllBlogs" element={<UserViewBlogs />} />
        <Route path="/myBlogs/:userId" element={<MyBlogs />} />
        <Route path="/addBlog" element={<AddBlog/>} />
        {/* <Route path="/blog/:blogId"  element={<EditBlog/>}/> */}
      </Routes>
      <Outlet />
        
    </>
  );
};






export default Admin

