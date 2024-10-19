import React, { useEffect } from 'react'
import AdnimNavBar from '../Navbar/AdnimNavBar'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import ViewBlogs from './ViewBlogs/ViewBlogs'
import ViewUsers from './ViewUsers/ViewUsers'
import AdminHome from './AdminHome/AdminHome'
import { useLocation } from 'react-router-dom';
import { useUser } from '../../UserInfo/UserContext'
import Edit from '../CommonComponent/Edit'

const Admin= () => {
//   const location = useLocation();
//   const user = location.state?.user;


let navigate= useNavigate();


let {user} = useUser;
  return (
    <>
       <AdnimNavBar user={user}/>
        <Routes>
        <Route path="" element={<Navigate to="AdminHome" />} /> 
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/Admin/ViewBlogs" element={<ViewBlogs />} />
        <Route path="/Admin/ViewUsers" element={<ViewUsers />} />
      </Routes>
      <Outlet />
        
    </>
  );
};






export default Admin

