import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='outer'>
    <div className='maxOuter'>
      <div className='innerBox'>
        <ul className='nav-ul'>
          <li><NavLink activeClassName='active' to="/">Products</NavLink></li>
          <li><NavLink activeClassName='active' to="/add">Add Product</NavLink></li>
          <li><NavLink activeClassName='active' to="/update">Update Product</NavLink></li>
          <li><NavLink activeClassName='active' to="/logout">Logout</NavLink></li>
          <li><NavLink activeClassName='active' to="/profile">Profile</NavLink></li>
          <li><NavLink activeClassName='active' to="/signup">Signup</NavLink></li>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Navbar
