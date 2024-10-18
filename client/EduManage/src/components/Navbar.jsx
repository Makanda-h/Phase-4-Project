
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';



function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);

  React.useEffect(() => {
    // Check local storage or make an API call to determine if the user is logged in
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('userRole');
      setIsLoggedIn(!!token);
      setUserRole(role);
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">EduManage</Link>
      </div>
      <ul className="navbar-links">
        {isLoggedIn ? (
          <>
            <li><Link to={`/${userRole.toLowerCase()}`}>Dashboard</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;