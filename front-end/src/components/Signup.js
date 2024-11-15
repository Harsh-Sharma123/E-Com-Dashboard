
import React from 'react';

const Signup = () => {
    return (
        <div className='maxOuter'>
            <div className='signupForm'>
                <h1>Register / Sign Up Form</h1>
                <input className='inputBox' type="text" placeholder="Enter your name" />
                <input className='inputBox' type="text" placeholder="Enter your email" />
                <input className='inputBox' type="password" placeholder="Enter your password" />
            </div>
        </div>
    )
}

export default Signup;