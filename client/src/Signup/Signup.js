import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import { useState } from 'react'
import {toast} from "react-toastify"
import axios from 'axios'
import './signup.css'
function SignUp(props) {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        tc: false

    })
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(data);
        if (
            data.name === "" ||
            data.email === "" ||
            data.password === "" ||
            data.confirmPassword === "" ||
            !data.tc // Check if the checkbox is not checked
        ) {
            toast.error("All fields are Required.");
        } else {
            try {
                const response = await axios.post("https://gmail-authentication-jwt-registration.vercel.app/user/register", data);
                console.log(response);
                toast.success("User Register successfully.");
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    tc: false
                });
            
            } catch (err) {
                console.log(err);
            }
        }
    }
    
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />
            <main className="main-container">
                <div>
                    <form className="login-page-login-form" >
                        <h1>Sign Up</h1>
                        <input className="input-field" type="text" id="username" required
                            placeholder="Enter Username"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                        <input className="input-field" type="email"
                            placeholder="Enter your email" required
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                        <input className="input-field" type="password"
                             placeholder="Enter Password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}

                        />
                        <input className="input-field" type="password"
                            id="password" placeholder="Enter Confirm Password"
                            value={data.confirmPassword}
                            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}

                        />
                        <div className="policy">
                            <input type="checkbox"
                                checked={data.tc}
                                onChange={(e) => setData({ ...data, tc: e.target.checked })}
                            />
                            <h3>I accept all terms & condition</h3>
                        </div>
                        <button onClick={onSubmitHandler} className="login-button" type="submit">Submit</button>
                        <div className="text">
                            <h3>Already have an account? <Link to={"/login"}>Login now</Link></h3>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default SignUp