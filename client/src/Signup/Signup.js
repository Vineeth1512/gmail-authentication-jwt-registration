import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './signup.css';

function SignUp(props) {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        tc: false
    });
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://gmail-authentication-jwt-registration.vercel.app/user/register", data);
            console.log(response);
           alert(response.data.message);
            setTimeout(() => {
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    tc: false
                });
                navigate("/login");
            }, 3000);
        } catch (err) {
            console.log(err.response.data.message);
           alert(err.response.data.message);
        }

    };


    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />
            <main className="main-container">
                <div>
                    <form className="login-page-login-form">
                        <h1>Sign Up</h1>
                        <input
                            className="input-field"
                            type="text"
                            id="username"
                            required
                            placeholder="Enter Username"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                        <input
                            className="input-field"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                        <input
                            className="input-field"
                            type="password"
                            placeholder="Enter Password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        <input
                            className="input-field"
                            type="password"
                            id="password"
                            placeholder="Enter Confirm Password"
                            value={data.confirmPassword}
                            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                        />
                        <div className="policy">
                            <input
                                type="checkbox"
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
    );
}

export default SignUp;
