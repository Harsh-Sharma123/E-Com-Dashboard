
import React, { useState } from 'react';

const Signup = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        console.log(name);
        console.log(email);
        console.log(password);
    }
    
    return (
        <div className='maxOuter'>
            <div className='signupForm'>
                <h1>Register / Sign Up Form</h1>
                <div className='inputWrapper'>
                    <input className='inputBox' type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} />
                    <input className='inputBox' type="text" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} />
                    <input className='inputBox' type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
                    <button type="button" className='signUpButton' onClick={handleSubmit}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;