import React, { useEffect, useState } from 'react'
import axios from 'axios';
const ViewBlogs = () => {

    const [state, setState] = useState({
        
        blogs: [],
        
    })
    useEffect(() => {
        // Fetch the blog data from the backend
        
    
        fetchBlog();
      }, []);
      const fetchBlog = async () => {
        try {
          const response = await axios.get('http://localhost:8000/blogs'); // Assuming you get blog by ID
          setState({ ...state, blogs: response.data.data });
          
        } catch (error) {
          console.error('Error fetching the blog:', error);
        }
      };
    
      const handleDelete = async (userId,blogId) => {
        try {
        await axios.delete(`http://localhost:8000/blog/${userId}/${blogId}`);
          alert('Blog deleted successfully');
          
          fetchBlog()
        fetchBlog()
        } catch (error) {
          console.error('Error deleting the blog:', error);
        }
      };
    return (
        <>
            <div className="container mt-5 d-flex flex-wrap justify-content-around">

            {
             state.blogs.map((blog)=>{
               return <div className="card mt-3" key={blog.id}>
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
                    <div className="card-footer d-flex justify-content-center">
                    <button type='button'  class="btn btn-danger px-5" onClick={()=>{handleDelete(blog.userId,blog.id)}} >Delete</button> 
                    </div>
                </div>
             })  
            }
                
                 

            </div>

        </>
    )
}

export default ViewBlogs
