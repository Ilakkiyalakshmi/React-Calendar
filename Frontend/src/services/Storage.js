import { useNavigate } from "react-router-dom"


export const storeUserData = (data)=>{
    localStorage.setItem('_id',data)
}

export const getUserData = ()=>{
    return localStorage.getItem('_id');
}

const RemoveUserData = ()=>{
    const navigate=useNavigate()
     localStorage.removeItem('_id')
     navigate('/login')
}
export default RemoveUserData