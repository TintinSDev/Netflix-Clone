import { Link } from "react-router-dom";
import Proptypes from "prop-types";

function Navbar({ isLoggedIn, handleSignOut}) {
  return (
    <nav>
      <div className="net">
        <h1>TINFLIX</h1>
      </div>
      <ul>
        {!isLoggedIn && (
          <>
            <li>
              <div className="sign">
                <Link to="/login">Sign In</Link>
              </div>
            </li>
            <li className="home-link">
              <Link to="/">Home</Link>
            </li>
          </>
        )}
        {/* <li>
            <Link to="/profilelist">ProfileList</Link>
            </li> */}
        {isLoggedIn && (
          <>
            <li>
              <div className="sign-out">
                <Link to="/" onClick={handleSignOut}>
                  Sign Out
                </Link>
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  isLoggedIn: Proptypes.bool.isRequired,
  handleSignOut: Proptypes.func.isRequired,
};

export default Navbar;
