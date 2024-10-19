import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
    const { blogId } = useParams(); // Get the blogId from the route parameter
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    id:0,
    title: '',
    content: '',
    author: '',
    userId:0

  });

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/blog/${blogId}`);
        setBlogData(response.data.data);
        
      } catch (error) {
        console.error('Error fetching blog details:', error);
        
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/blog/${blogId}`, blogData);
      if (response.status === 200) {
        alert('data updated successfully')
        navigate(`/user/myBlogs/${blogData.userId}`)
      }
    } catch (error) {
      alert('Error updating blog:', error);
    }
  };

  return (
    <>
      <div
		class="container mt-5 d-flex flex-column justify-content-center align-items-center">
		<h2>Add a New Blog Post</h2>
		<form class="w-50" action="" method="post" onSubmit={handleSubmit}>
		    <div class="form-group">
				<label for="id">Blog Id</label> <input type="text"
					class="form-control" name="id" id="id"
					 readonly="readonly" value={blogData.id}  ></input>
			</div>
			<div class="form-group">
				<label for="title">Blog Title</label> <input type="text"
					class="form-control" name="title" id="title"
					placeholder="Enter blog title" required value={blogData.title} onChange={handleInputChange} ></input>
			</div>

			<div class="form-group">
				<label for="content">Blog Content</label>
				<textarea class="form-control" id="content" name="content" rows="5"
					placeholder="Write your content here" required value={blogData.content} onChange={handleInputChange}>
					
					</textarea>
			</div>

			<div class="form-group">
				<label for="author">Author Name</label> <input type="text"
					class="form-control" id="author" name="author"
					placeholder="Enter author name"   readonly="readonly" value={blogData.author}></input>
			</div>

			<button type="submit" class="btn btn-primary mt-2">Update</button>
		</form>
	</div>
    
    </>
  )
}

export default EditBlog
