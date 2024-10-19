import axios from "axios"
export class BolgService{
    static serverURl=`http://localhost:8000`
    static addblog(blog){
        
        return axios.post('http://localhost:8000/user',blog)
    }
}