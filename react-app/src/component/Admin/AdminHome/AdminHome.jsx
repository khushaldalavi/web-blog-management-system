import React from 'react'
import AdnimNavBar from '../../Navbar/AdnimNavBar'

const AdminHome = () => {
  return (
    <>
	
      <div className="container my-5">
		<div className="text-center">
			<h2>Welcome to BlogSpere</h2>
			<p className="lead">Manage your users.</p>
		</div>
		<div className="container mt-5" id='adminHomeContainer'>
			<div className="row mt-2">
				
				<div className="col-md-6 ">
					<div className="card text-center">
						<div className="card-body">
							<h5 className="card-title">Total Users</h5>
							<p className="card-text display-6" id="totalUsers">
								4
							</p>
						</div>
						<div className=" d-flex justify-content-around">
							<div className="d-flex mt-1">
								<p className="bg-danger p-2 rounded-3 text-light">Blocked</p>
								<sup className="mt-2 "><span
									className="p-1 bg-warning rounded-circle fw-bold text-light">2</span>
								</sup>
							</div>
							<div className="d-flex mt-1 ">
								<p className="bg-primary p-2 rounded-3 text-light">UnBlocked</p>
								<sup className="mt-2 "><span
									className="p-1 bg-warning rounded-circle fw-bold text-light">2</span>
								</sup>
							</div>
						</div>
					</div>
				</div>

				
				<div className="col-md-6 ">
					<div className="card text-center h-100">
						<div className="card-body">
							<h5 className="card-title">Total Blogs</h5>
							<p className="card-text display-6" id="totalBlogs">5</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	
	<footer className="bg-dark text-white text-center py-3">
		<p>&copy; All rights reserved.</p>
	</footer>
    </>
  )
}

export default AdminHome
