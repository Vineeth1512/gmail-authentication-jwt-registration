import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';

function Signin() {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://gmail-authentication-jwt-registration.vercel.app/user/login", data);
            console.log(response);
            // Store the token in localStorage
            localStorage.setItem('token', response.data.token);
         //   alert(response.data.message);
            setData({
                email: "",
                password: "",
            });
            navigate("/details");

        } catch (err) {
            console.log(err.response.data.message);
            alert(err.response.data.message);
        }
    }
    return (
        <>
            <Header />
            <main className="main-container">
                <div>
                    <form className="login-page-login-form" >
                        <h1>Login</h1>
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
                            id="password"
                            placeholder="Enter Password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        <h3><Link to={"/forgetPassword"}>Forget Password?</Link></h3>
                        <button onClick={onSubmitHandler} className="login-button" type="submit">Login</button>
                        <div className="text">
                            <h3>Don't have an account?<Link to={"/signup"} > SignUp now</Link></h3>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Signin;
