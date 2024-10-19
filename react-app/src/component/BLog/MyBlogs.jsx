import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
const MyBlogs = () => {
    let{userId}=useParams()
    const navigate=useNavigate()
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const [state, setState] = useState({
        
        blogs: [],
        
    })

    const fetchBlog = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/myblog/${userId}`); // Assuming you get blog by ID
          setState({ ...state, blogs: response.data.data });
          
        } catch (error) {
          console.error('Error fetching the blog:', error);
        }
      };

    useEffect(() => {
        fetchBlog();
      }, [userId]);

      const handleDelete = async (blogId) => {
            try {
              await axios.delete(`http://localhost:8000/blog/${userId}/${blogId}`);
              alert('Blog deleted successfully');
              // navigate(`user/myBlogs/${userId}`)
              fetchBlog()
            
            } catch (error) {
              console.error('Error deleting the blog:', error);
            }
          };
  return (
    <>
         <div class="container mt-5 d-flex flex-wrap justify-content-around">

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
                    <div class="card-footer d-flex justify-content-around">
				<button type='button'  class="btn btn-danger px-5" onClick={()=>{handleDelete(blog.id)}} >Delete</button> 
				{/* <Link to={`updateBlog/${blog.id}`} class="btn btn-primary px-5">Update</Link> */}
                <Link to={`/blog/${blog.id}`} className="btn btn-warning">Update Blog</Link>
			</div>
                    
                </div>
             })  
            }
       </div>
    </>

 
    
  )
}

export default MyBlogs
