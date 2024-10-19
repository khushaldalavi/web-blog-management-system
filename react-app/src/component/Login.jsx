import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

import { useUser } from '../UserInfo/UserContext';

const Login = () => {
    const { setUser } = useUser();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
//   const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in both email and password');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(
        `http://localhost:8000/login/${encodeURIComponent(formData.email)}/${encodeURIComponent(formData.password)}`
      );

      if (response.status === 200) {
        
        const userData = response.data.data; 
        if (!userData.block) {
          setUser(userData); 
        const role = userData.role; 
        localStorage.setItem('isLoggedIn', 'true')
        navigate(`/${role.toLowerCase()}`);
        }else{
          setErrorMessage('Your Account is block by admin');
        }

    }
    } catch (error) {
      if (error.response) {
        setErrorMessage('Invalid email or password');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
  
      <div className="card mx-auto" style={{ maxWidth: '400px', height:'350px'}}>
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
          </div>
            <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <p class=" pb-lg-2 text-center" style={{color:'#393f81'}}>
				Don't have an account? <Link to={'/signup'} style={{color:'blue'}}>Register
					here</Link>
			</p>

          </form>
          {errorMessage && <p className="text-danger mt-2 text-center">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
