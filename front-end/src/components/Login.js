import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        // toast.dismiss();

        if(auth){
            navigate("/")
        }
    })

    const handleLogin = async () => {
        // console.log(email, password);

        if(!email || !password){
            toast.dismiss();
            toast.error("Please enter your email and password for logging in");
            return ;
        }

        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            toast.dismiss();
            toast.success("User Logged in Successfully !!");
            setTimeout(()=>{

            }, 1000);
            navigate("/");
        }else{
            alert("Incorrect Credentials!!")
        }
    }

    return (
        <div className='maxOuter'>
            <div className='login'>
                <h1 className='text-center'>Login / SignIn Form</h1>
                <div className='inputWrapper'>
                    <input className='inputBox' type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
                    <input className='inputBox' type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <button type="button" className='signUpButton' onClick={handleLogin}>Sign In</button>
                </div>
            </div>
            {/* <Toaster /> */}
        </div>
    )
}

export default Login;