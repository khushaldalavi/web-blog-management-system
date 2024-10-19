import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../../UserInfo/UserContext';
import { AdminService } from '../../Service/AdminServece/AdminService';

const AdnimNavBar = () => {
	const { user } = useUser();
	let navigate=useNavigate()
	
	const handleLogOut=()=>{
		localStorage.removeItem("loggedin")
		navigate("/")
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
			<Link class="navbar-brand" to={'AdminHome'}>BlogSphere</Link>
			<button class="navbar-toggler" type="button"
				data-bs-toggle="collapse" data-bs-target="#navbarNav"
				aria-controls="navbarNav" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse " id="navbarNav">
				<ul class="navbar-nav ">
					<li class="nav-item"><Link class="nav-link active"
						aria-current="page" to={'AdminHome'}>Home</Link></li>
					<li class="nav-item"><Link class="nav-link" to={'Admin/ViewBlogs'}>All
							Blog</Link></li>
					<li class="nav-item"><Link class="nav-link" to={'Admin/ViewUsers'}>All
							users</Link></li>

				</ul>
			</div>
			<div
				class="d-flex rounded-circle me-2 border border-light justify-content-center"
				>
				<div class="dropdown  text-light">
					<button class="text-light  bg-dark rounded-circle border-0 fs-4"
						type="button" id="profileDropdown" data-bs-toggle="dropdown" style={{width:30}}>
						<i class="fa fa-user"></i>
					</button>
					<ul class="dropdown-menu dropdown-menu-end bg-dark text-light"
						aria-labelledby="profileDropdown" >
						<li class="text-light ms-2">{user.name}</li>
						<li class=" text-light ms-2"><i class="fa fa-envelope"></i>{user.email}</li>
						<li class="text-light ms-2"><i class="fa fa-mobile-button"></i>{user.mobile}</li>
						<li class="dropdown-divider border-0 border-top border-light "></li>
						<li><Link class="dropdown-item text-light" to={`/updateProfile/${user.id}`}><i
								class="fa-regular fa-pen-to-square"></i> Edit Profile</Link></li>
						<li><button type='button' class="dropdown-item text-light" onClick={()=>{clickDelete(user.id)}}><i
								class="fa fa-trash-can"></i> Remove Profile</button></li>

						<li><button class="dropdown-item text-light" type='button' onClick={handleLogOut}>Logout</button></li>
					</ul>
				</div>
			</div>
		</div>


	</nav>
    </>
  )
}

export default AdnimNavBar

