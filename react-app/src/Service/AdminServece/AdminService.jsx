import axios from "axios"

export class AdminService{
    static serverURl=`http://localhost:8000`
    static addUser(admin){
        
        return axios.post('http://localhost:8000/user',admin)
    }

    static login(email,password){
        return axios.get(`http://localhost:8000/user/${email}/${password}`)
    }

    static allUsers(){
        return axios.get('http://localhost:8000/users')
    }

    static deleteUser(userId){
        return axios.delete(`http://localhost:8000/user/${userId}`)
    }

    static getUser(userId){
        return axios.get(`http://localhost:8000/user/${userId}`)
    }

    static updateProfile(user){
        return axios.put(`http://localhost:8000/user`,user)
    }
}