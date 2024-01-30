import React, { useState } from 'react'
import Header from '../Header/Header'
import axios from 'axios';
function ResetPassword(props) {
    const [email ,setEmail]=useState({
        email:""
    })
    const onSubmitHandler =async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("https://gmail-authentication-jwt-registration.vercel.app/user/send-reset-password-email",email);
            console.log(response);
           // const token = response.data.token;
           // localStorage.setItem('token', token);
            alert(response.data.message);
            setEmail({
                email:""
            })
        }catch(err){
            console.log(err.response.data.message);
            alert(err.response.data.message);      
        }
      
    }

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />
            <main className="main-container">
                <div>
                    <form className="login-page-login-form" >
                        <h1>Reset Password</h1>
                        <input className="input-field" type="email" placeholder="Enter your email" 
                        required value={email.email} onChange={(e)=>setEmail({email:e.target.value})} />
                        <button onClick={onSubmitHandler} className="login-button" type="submit">Submit</button>
                    </form>
                </div>
            </main>

        </>
    )
}

export default ResetPassword