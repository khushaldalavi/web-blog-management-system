import React, { useState } from 'react'
import { AdminService } from '../../Service/AdminServece/AdminService'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

   let navigate  =useNavigate()
    const[state,setState]=useState(
        {
          admin:{
            name:"",
            email:"",
            mobile:"",
            password:"",
            role:"User"
          },
          errorMassage:""    
        }
    )
    
    const updateHandler=(event)=>{
        setState({...state,admin:{
          ...state.admin,[event.target.name]:event.target.value
        }})
      }

    

    const submitHandler=(event)=>{
       event.preventDefault()
       let promis=new Promise((res,rej)=>{
            let postData=AdminService.addUser(state.admin)

            res(postData)
       })
        promis.then((res1)=>{
            console.log(res1.name);
            if (res1) {
                setState({...state,errorMassage:alert('data is added')})
                navigate('/')
               }
                 
        }).catch(()=>{
            setState({...state,errorMassage:alert('Something went Wrong!!')})
            navigate('/signup')
        })

    }

  return (

    <>
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h3 className="text-center mb-4">Sign Up</h3>
                <form action=""  method="post" onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter your full name" required onChange={updateHandler}></input>
                    </div>

                    <div className="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" required onChange={updateHandler}></input>
                        
                    </div>

                    <div className="mb-3">
                        <label for="mobile" className="form-label">Mobile</label>
                        <input type="text" className="form-control" id="mobile" name="mobile" placeholder="Enter your mobile number" required onChange={updateHandler}></input>
                    </div>

                    <div className="mb-3">
                        <label for="password" className="form-label"> Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" required onChange={updateHandler}></input>
                    </div>
                   <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
            </div>
            
        </div>
        
    </div>
    </>
  )
}

export default Signup
