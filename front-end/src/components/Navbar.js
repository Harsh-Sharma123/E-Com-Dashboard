import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  }

  return (
    <div className='outer'>
      <div className='maxOuter'>
        <div className='innerBox'>
          <ul className='nav-ul'>
            <li><NavLink activeClassName='active' to="/">Products</NavLink></li>
            <li><NavLink activeClassName='active' to="/add">Add Product</NavLink></li>
            <li><NavLink activeClassName='active' to="/update">Update Product</NavLink></li>
            <li><NavLink activeClassName='active' to="/profile">Profile</NavLink></li>
            { auth ? <li> <NavLink activeClassName='active' to="/signup" onClick={logout}>Logout</NavLink></li> :
            <>
            <li><NavLink activeClassName='active' to="/login">Login</NavLink></li> 
            <li><NavLink activeClassName='active' to="/signup">Signup</NavLink></li> </>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
