import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../../UserInfo/UserContext';
import { AdminService } from '../../Service/AdminServece/AdminService';

const UserNavbar = () => {
	const { user } = useUser();
	let navigate=useNavigate()
	
	const handleLogOut=()=>{
		localStorage.removeItem('isLoggedIn'); // Remove login status
		navigate('/')
	}

	let clickDelete=(userId)=>{
		let promise= new Promise((res,rej)=>{
		  let deleteContact=AdminService.deleteUser(userId)
		  res(deleteContact)
		})
	
		promise.then((res1)=>{
		  if (res1) {
			navigate("/")
		  }
		})
	  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<Link class="navbar-brand" to={'userHome'}>BlogSphere</Link>
			<button class="navbar-toggler" type="button"
				data-bs-toggle="collapse" data-bs-target="#navbarNav"
				aria-controls="navbarNav" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse " id="navbarNav">
				<ul class="navbar-nav ">
					<li class="nav-item"><Link class="nav-link active"
						aria-current="page" to={'userHome'}>Home</Link></li>
					<li class="nav-item text-light"><Link class="nav-link"
						to={'addBlog'}>Add Blog</Link></li>
					<li class="nav-item text-light">
                        <Link class="nav-link" to={'veiwAllBlogs'}>All Blogs</Link></li>
					<li class="nav-item text-light"><Link class="nav-link"
						to={`myBlogs/${user.id}`}>My Blogs</Link></li>
					{/* <li class="nav-item ">
						<div class="dropdown">
							<button class="btn dropdown-toggle text-light" type="button"
								id="dropdownMenuButton" data-bs-toggle="dropdown"
								aria-expanded="false">Blog Categories</button>
							<ul class="dropdown-menu g" aria-labelledby="dropdownMenuButton">
								
								<li><a class="dropdown-item" href="#personal">Personal Blogs</a></li>
								<li><a class="dropdown-item" href="#business">Business/Corporate
										Blogs</a></li>
								<li><a class="dropdown-item" href="#niche">Niche Blogs</a></li>
								<li><a class="dropdown-item" href="#professional">Professional
										Blogs</a></li>
								
								<li><a class="dropdown-item" href="#news">Media/News Blogs</a></li>
								
								<li><a class="dropdown-item" href="#travel">Travel Blogs</a></li>
								<li><a class="dropdown-item" href="#fashion">Fashion/Beauty
										Blogs</a></li>
								<li><a class="dropdown-item" href="#health">Health  Wellness
										Blogs</a></li>
								
								
								<li><a class="dropdown-item" href="#">Educational Blogs</a></li>
								<li><a class="dropdown-item" href="#">Political Blogs</a></li>
							</ul>
						</div>
						</li> */}


				</ul>
			</div>
			<div
				class="d-flex rounded-circle me-2 border border-light justify-content-center"
				>
				<div class="dropdown  text-light">
					<button class="text-light  bg-dark rounded-circle border-0 fs-4"
						type="button" id="profileDropdown" data-bs-toggle="dropdown" style={{width:40}}>
						<i class="fa fa-user"></i>
					</button>
					<ul class="dropdown-menu dropdown-menu-end bg-dark text-light"
						aria-labelledby="profileDropdown" style={{width:200}} >
						<li class="text-light ms-2 px-2">{user.name}</li>
						<li class=" text-light ms-2 px-1"><i class="fa fa-envelope"></i> {user.email}</li>
						<li class="text-light ms-2 px-2"><i class="fa fa-mobile"></i> {user.mobile}</li>
						<li class="dropdown-divider border-0 border-top border-light "></li>
						<li><Link class="dropdown-item text-light" to={`/updateProfile/${user.id}`}><i
								class="fa-regular fa-pen-to-square"></i> Edit Profile</Link></li>
						<li><button type='button' class="dropdown-item text-light" onClick={()=>{clickDelete(user.id)}}><i
								class="fa fa-trash-can"></i>Remove Profile</button></li>

						<li><button class="dropdown-item text-light" type='button' onClick={handleLogOut}>Logout</button></li>
					</ul>
				</div>
			</div>
		</div> 


	</nav>
    </>
  )
}

export default UserNavbar

