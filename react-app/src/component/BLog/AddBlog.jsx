import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../UserInfo/UserContext';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
   let{user} =useUser()
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    blogCategory: '',
    title: '',
    content: '',
    author: '',

  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const updateHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      const response = await axios.post(`http://localhost:8000/blog?blogCategory=${formData.blogCategory}&title=${formData.title}&content=${formData.content}&author_name=${formData.author}&userId=${user.id}
       `); 
      setSuccessMessage('Blog post added successfully!');
    //   setFormData({
    //     blogCategory: '',
    //     title: '',
    //     content: '',
    //     author: '',
        
    //   });
      navigate(`/user/myBlogs/${user.id}`)
    } catch (error) {
      setErrorMessage('Error creating blog post. Please try again.');
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
      <h2>Add a New Blog Post</h2>
      <form className="w-50" onSubmit={submitHandler}>
        {/* Blog Category */}
        <div className="mb-3">
          <label htmlFor="blogCategory" className="form-label">Blog Category</label>
          <select
            name="blogCategory"
            className="form-select"
            id="blogCategory"
            value={formData.blogCategory}
            onChange={updateHandler}
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="personal">Personal Blog</option>
            <option value="business">Business/Corporate Blog</option>
            <option value="niche">Niche Blog</option>
            <option value="professional">Professional Blog</option>
            <option value="news">Media/News Blog</option>
            <option value="travel">Travel Blog</option>
            <option value="fashion">Fashion/Beauty Blog</option>
            <option value="health">Health Blog</option>
            <option value="finance">Investment Blog</option>
            <option value="educational">Educational Blog</option>
            <option value="political">Political Blog</option>
          </select>
        </div>

        {/* Blog Title */}
        <div className="form-group">
          <label htmlFor="title">Blog Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            placeholder="Enter blog title"
            value={formData.title}
            onChange={updateHandler}
            required
          />
        </div>

        {/* Blog Content */}
        <div className="form-group">
          <label htmlFor="content">Blog Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="5"
            placeholder="Write your content here"
            value={formData.content}
            onChange={updateHandler}
            required
          ></textarea>
        </div>

        {/* Author Name */}
        <div className="form-group">
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            placeholder="Enter author name"
            value={formData.author_name}
            onChange={updateHandler}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-2">Submit</button>

        {/* Success and Error Messages */}
        {successMessage && <p className="text-success mt-3">{successMessage}</p>}
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddBlog;
