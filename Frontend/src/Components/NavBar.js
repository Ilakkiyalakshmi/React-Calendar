import { Link, NavLink } from "react-router-dom"
import { isAuthenticated } from "../services/Auth"
import RemoveUserData from "../services/Storage"
import { useNavigate } from "react-router-dom"
export default function NavBar(props) {
    const navigate=useNavigate();
    return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">Calendar</NavLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto"  >
                {/* { <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li> }
                { <li><Link className="nav-link" to="/login" >Login</Link></li> }
                 <li className="nav-item"><Link className="nav-link" to="/dashboard" >Dashboard</Link></li>  */}
                 <li><span className="nav-link" onClick={()=>{localStorage.removeItem('_id');navigate('/login');localStorage.removeItem('token')}} style={{ cursor: "pointer" }} >Logout</span></li> 
            </ul>
        </div>
    </nav>)
}