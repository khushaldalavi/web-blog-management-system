import React, { useEffect, useState } from 'react'
import { useUser } from '../../UserInfo/UserContext'
import axios from 'axios'

const UserViewBlogs = () => {
   let{user} =useUser()
   const [state, setState] = useState({
        
	blogs: [],
	
})
const categories = [
  'Personal', 'Business', 'News', 'Travel', 'Health', 
  'Fashion', 'Finance', 'Educational', 'Political','Professional'
];

const filterBlogsByCategory = (category) =>
  state.blogs.filter((blog) => blog.blogCategory === category);
useEffect(() => {
	
	const fetchBlog = async () => {
	  try {
		const response = await axios.get('http://localhost:8000/blogs'); // Assuming you get blog by ID
		setState({ ...state, blogs: response.data.data });
		
	  } catch (error) {
		console.error('Error fetching the blog:', error);
	  }
	};

	fetchBlog();
  }, []);
  return (
    <>
      
      <div className="container mt-5">
      
      {categories.map((category) => {
        const filteredBlogs = filterBlogsByCategory(category);
        if (filteredBlogs.length === 0) return null; // Skip empty categories

        return (
          <div key={category} className="mb-5">
            <h3 className="text-primary">{category} Blogs</h3>
            <div className="row d-flex justify-content-around">
              {filteredBlogs.map((blog) => (
                 <div className="card mt-3" key={blog.id}>
                 <div className="card-body">
                     <div className="d-flex justify-content-between">
                         <h5 className="card-title">{blog.title}</h5>
                         <small className="text-muted">Date: <span>{blog.date}</span>
                         </small>
                     </div>
                     <p className="card-text">
                         {blog.content}
                     </p>
                     <div className="text-end">
                         <small className="text-muted">Author: <span>{blog.author}</span>
                         </small>
                     </div>
                 </div>
                 
             </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
    </>
  )
}

export default UserViewBlogs
