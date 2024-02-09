import axios from "axios"
import { getUserData} from './Storage'

export const RegisterApi = (inputs)=>{
    let data  = {username:inputs.name,email:inputs.email,password:inputs.password, loginTime:inputs.startTime, logoutTime:inputs.endTime }
    return axios.post("http://localhost:3000/api/users/register", data);

}

export const LoginApi = (inputs)=>{
    let data  = {email:inputs.email,password:inputs.password }
    return axios.post("http://localhost:3000/api/users/login", {...data});
}

export const UserDetailsApi = ()=>{
    let data = {_id:getUserData()}
    return axios.post("[URL]",data)
}
