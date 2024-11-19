import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");

        if(auth){
            navigate("/")
        }
    })

    const handleLogin = async () => {
        // console.log(email, password);
        let result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        if(result.name){
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/");
        }else{
            alert("Incorrect Credentials!!")
        }
    }

    return (
        <div className='maxOuter'>
            <div className='login'>
                <h2>Login / SignIn Form</h2>
                <div className='inputWrapper'>
                    <input className='inputBox' type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
                    <input className='inputBox' type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <button type="button" className='signUpButton' onClick={handleLogin}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default Login;