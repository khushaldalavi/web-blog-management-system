import React, { useEffect, useState } from 'react'
import { AdminService } from '../../../Service/AdminServece/AdminService'
import axios from 'axios'

const ViewUsers = () => {
    const [error, setError] = useState(null);
    const [state, setState] = useState({
        loading: true,
        users: [],
        errorMassage: ''
    })
    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        let promise = new Promise((res, rej) => {
            setState({ ...state, users: [] });
            let response = AdminService.allUsers()
            res(response)
        })

        promise.then((res1) => {
            setState({ ...state, loading: false, users: res1.data.data });
        }).catch(() => {
            setState({ ...state, loading: false, errorMassage: alert('data not found') });
        })
      };
    

    const handleBlock = (id) => {
        axios.patch(`http://localhost:8000/user/${id}/block`)
          .then(() => {
            
            fetchUsers();
          })
          .catch((error) => {
            console.error('Error blocking user:', error);
          });
      };
    
      // Handler for unblocking a user
      const handleUnblock = (id) => {
        axios.patch(`http://localhost:8000/user/${id}/unblock`)
          .then(() => {
            
            fetchUsers();
          })
          .catch((error) => {
            console.error('Error unblocking user:', error);
          });
      };
    let { loading, users, errorMassage } = state
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }



    return (
        <>
            <div className="container mt-5">
                <h1>User List</h1>

                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">User ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Role</th>
                            <th scope='col'>Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            loading ? 'spinner' : <React.Fragment>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.role}</td>
                                        <td>{user.block ? 'Blocked' : 'Active'}</td>
                                        <td>
                                            
                                            {user.block ? (
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => handleUnblock(user.id)}
                                                >
                                                    Unblock
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleBlock(user.id)}
                                                >
                                                    Block
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default ViewUsers
