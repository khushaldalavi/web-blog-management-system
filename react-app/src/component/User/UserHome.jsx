import React from 'react'

import UserViewBlogs from './UserViewBlogs'

const UserHome = () => {
  return (
    <>
       <div class="container " style={{margin:80}}>
		<div class="text-center">
			<h2>Welcome to the BlogSphere</h2>
			<p>Welcome to our web blog, your go-to destination for insightful
				articles, creative ideas, and the latest trends across a wide range
				of topics. Whether you're passionate about technology, lifestyle,
				travel, or personal development, we bring you fresh content designed
				to inspire and inform. Join our community of readers, explore
				diverse perspectives, and stay updated with stories that matter to
				you. Happy reading!</p>

			<a href="#main-container" class="btn btn-success btn-lg">Explore
				Blogs</a>
		</div>
	  </div>
     <div id='main-container'>
     <UserViewBlogs/>
     </div>
    </>
  )
}

export default UserHome
