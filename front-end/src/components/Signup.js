
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");

        if(auth){
            navigate("/");
        }
    })

    const handleSubmit = async () => {
        // console.log(name);
        // console.log(email);
        // console.log(password);

        // const users = await fetch("http://localhost:5000/users");
        // let usersRes = await users.json();
        // for(let user of usersRes){
        //     if(user.email === email){
        //         toast.dismiss();
        //         toast.error("Email ID is already registered with some user !")
        //         return;
        //     }
        // }

        // return ;

        if(!name || !email || !password){
            toast.dismiss();
            toast.error("Please fill all the details for registering User.");
            return ;
        }

        const result = await fetch("http://localhost:5000/register", {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {
                'content-type': 'application/json'
            },
        });
        const res = await result.json();
        console.log(res);

        if(res){
            localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem("token", JSON.stringify(res.auth));
            toast.dismiss();
            toast.success("User Registered Successfully !");
            navigate("/");
        }

        
    }
    
    return (
        <div className='maxOuter'>
            <div className='signupForm'>
                <h1>Register / Sign Up Form</h1>
                <div className='inputWrapper'>
                    <input className='inputBox' type="text" placeholder="Enter your name" onChange={(e)=>{setName(e.target.value); console.log(e.target.value)}} />
                    <input className='inputBox' type="text" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} />
                    <input className='inputBox' type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
                    <button type="button" className='signUpButton' onClick={handleSubmit}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;