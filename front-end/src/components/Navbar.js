import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='outer'>
    <div className='maxOuter'>
      <div className='innerBox'>
        <ul className='nav-ul'>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/update">Update Product</Link></li>
          <li><Link to="/logout">Logout</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Navbar
