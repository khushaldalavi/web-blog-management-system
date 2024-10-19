import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

import Login from './component/Login';
import Admin from './component/Admin/Admin';
import User from './component/User/User';
import { UserProvider } from './UserInfo/UserContext';
import ProtectedRoute from './Auth/ProtectedRoute';
import Signup from './component/Signup/Signup';
import Edit from './component/CommonComponent/Edit';
import AddBlog from './component/BLog/AddBlog';
import EditBlog from './component/BLog/EditBlog';
import ViewBlogs from './component/User/UserViewBlogs';
import AdminHome from './component/Admin/AdminHome/AdminHome';
import MyBlogs from './component/BLog/MyBlogs';
import UserViewBlogs from './component/User/UserViewBlogs';
import UserHome from './component/User/UserHome';
const App = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return (
    <>
      <UserProvider>
        <BrowserRouter>
        
        <Routes>
            <Route path="/" element={<Login />} />
            
            <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/user/*" element={<ProtectedRoute>
              <User />
            </ProtectedRoute>
              } />
            
            <Route path='/signup' element={<ProtectedRoute><Signup /></ProtectedRoute>} />
            <Route path="/updateProfile/:userId" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
            <Route path="/blog/:blogId" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
            
        </Routes>
        
          
        </BrowserRouter>
      </UserProvider>
    </>



  );
};

export default App;
