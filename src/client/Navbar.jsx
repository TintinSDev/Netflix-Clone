
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <nav>
        <div className="net">    
            <h1>NETFLIX</h1>
        </div>
        <ul>
            <li>
            <div className='sign'>
            <Link to="/login">Sign In</Link>
            </div>
            </li>
            <li className="home-link">
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/profilelist">ProfileList</Link>
            </li>
        </ul>
       
        
        
        
        </nav>
        
    )
}

export default Navbar;