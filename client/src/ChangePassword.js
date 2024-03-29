import React from 'react'
import Header from './Header/Header'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
function ChangePassword(props) {
    const [data, setData] = useState({
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate();
    const { id, token } = useParams();
    useEffect(() => {
    }, [id, token]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(data);
        try {
            const response = await axios.post(`https://gmail-authentication-jwt-registration.vercel.app/user/reset-password/${id}/${token}`, data,
            );
            console.log(response.data);
            alert(response.data.message);
            setTimeout(() => {
                setData({
                    password: "",
                    confirmPassword: ""
                });
                navigate("/login");
            })

        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
        }
    }
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />
            <main className="main-container">
                <div>
                    <form className="login-page-login-form" >
                        <h1>Change Password Here..!</h1>
                        <input className="input-field" type="password" placeholder="Enter New Password" required
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        <input className="input-field" type="password"
                            id="password" placeholder="Enter Confirm Password"
                            value={data.confirmPassword}
                            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                        />
                        <button onClick={onSubmitHandler} className="login-button" type="submit">Submit</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default ChangePassword