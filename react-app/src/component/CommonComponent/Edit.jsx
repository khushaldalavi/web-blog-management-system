import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminService } from '../../Service/AdminServece/AdminService'


const Edit = () => {
  let{userId} =useParams()
  let navigate=useNavigate();


  const[state,setState]=useState(
    {
      user:{
        id:0,
        name:"",
        email:"",
        mobile:"",
        password:"",
        
      },
      errorMassage:""    
    }
)
const updateHandler=(event)=>{
    setState({...state,user:{
      ...state.user,[event.target.name]:event.target.value
    }})
  }

  useEffect(() => {
    fetchUser();
}, [userId])

const fetchUser = () => {
    let promise = new Promise((res, rej) => {
        let response = AdminService.getUser(userId)
        res(response)
    })

    promise.then((res1) => {
        setState({ ...state,  user: res1.data });
    }).catch(() => {
        setState({ ...state,  errorMassage: alert('data not found') });
    })
  };

  let{user,errorMassage}=state

  const submitHandler=(event)=>{
    event.preventDefault()
    let promis=new Promise((res,rej)=>{
         let postData=AdminService.updateProfile(user)
          res(postData)
    })
     promis.then((res1)=>{
         
         if (res1) {
            const userData = res1.data.data; 
            const role = userData.role; 
             setState({...state,errorMassage:alert('data is added')})
             navigate(`/${role.toLowerCase()}`);
            }
              
     }).catch(()=>{
         setState({...state,errorMassage:alert('Something went Wrong!!')})
         navigate('/updateProfile/:userId')
     })

 }



  return (
    <>
         <div className="container  py-5">
        <div className="row justify-content-center">
            <div className="col-md-6 p-2 border rounded-3 ">
                <h3 className="text-center mb-4">Edit Profile</h3>
                <form action="" method="post" onSubmit={submitHandler}> 
                <div className="mb-3">
                        <label for="name" className="form-label"> Id</label>
                        <input type="text" className="form-control" id="id" name="id" value={user.id} readonly="readonly" onChange={updateHandler} ></input>
                    </div>
                
                    <div className="mb-3">
                        <label for="name" className="form-label"> Name</label>
                        <input type="text" className="form-control" id="name" value={user.name} name="username" onChange={updateHandler}></input>
                    </div>

                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={user.email} name="email" onChange={updateHandler}></input>
                    </div>

                    <div className="mb-3">
                        <label for="mobile" className="form-label">Mobile</label>
                        <input type="text" className="form-control" id="mobile" value={user.mobile} name="mobile" onChange={updateHandler}></input>
                    </div>

                    <div className="mb-3">
                        <label for="password" className="form-label"> Password</label>
                        <input type="password" className="form-control" id="password" value={user.password} name="password" onChange={updateHandler}></input>
                    </div>

                   

                    <button type="submit" className="btn btn-primary w-100">Update</button>
                </form>
            </div>
          </div>
        
    </div>

    </>
      
    
  )
}

export default Edit
