import { Link, redirect, useNavigate, useNavigation } from "react-router-dom";
import useLogout from "../hooks/useLogout";

import useAuth from "../hooks/useAuth";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    // redirect("/login");
    navigate("/login");
  }
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout buddy</h1>
        </Link>
        <nav>
          {user && (
            <>
              <div>
                <span>{user.email}</span>
                <button onClick={handleLogout}>logout</button>
              </div>
              <Link to="/saved">saved workout</Link>
              {"    "}
              <Link to="/all-workout">all workout</Link>
            </>
          )}
          {!user && (
            <div>
              <Link to="/login">login</Link>
              {"    |   "}
              <Link to="/signup">signup </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
