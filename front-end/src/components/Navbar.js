import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  // console.log(JSON.parse(auth).name)

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
    toast.dismiss();
    toast.success("User Logged out Successfully !!");
  }

  return (
    <div className='outer'>
      <div className='maxOuter'>
        <div className='innerBox'>
          <div className='logo-container'>
          <img src="https://st2.depositphotos.com/4221849/8056/v/450/depositphotos_80567196-stock-illustration-red-circle-logo.jpg" className='logo' />
          </div>
          <div className={`nav-items ${auth ? 'logged-in' : 'logged-out'} `}>
            {
              auth ?
                <ul className='nav-ul'>
                  <li><NavLink activeClassName='active' to="/">Products</NavLink></li>
                  <li><NavLink activeClassName='active' to="/add">Add Product</NavLink></li>
                  {/* <li><NavLink activeClassName='active' to="/update">Update Product</NavLink></li> */}
                  {/* <li><NavLink activeClassName='active' to="/profile">Profile</NavLink></li> */}
                  <li> <NavLink activeClassName='active' to="/signup" onClick={logout}>Logout ({JSON.parse(auth).name}) </NavLink></li>
                </ul>
                :
                <ul className='nav-ul'>
                  <li><NavLink activeClassName='active' to="/login">Login</NavLink></li>
                  <li><NavLink activeClassName='active' to="/signup">Signup</NavLink></li>
                </ul>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
