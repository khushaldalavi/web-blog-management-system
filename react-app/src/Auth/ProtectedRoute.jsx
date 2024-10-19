import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);  // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  // If logged in, render the protected component
  return children;
};

export default ProtectedRoute;
