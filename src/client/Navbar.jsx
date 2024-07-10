
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <nav>
        <div className="net">    
            <h1>NETFLIX</h1>
        </div>
        <div className='sign'>
        <Link to="/login">Sign In</Link>
        </div>
        </nav>
        
    )
}

export default Navbar;