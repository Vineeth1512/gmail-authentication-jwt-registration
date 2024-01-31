import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserDetails() {
    const [data, setData] = useState();
    const navigate = useNavigate();
    const logoutfunction = async()=>{
        navigate("/login");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Retrieve the token from localStorage
                const token = localStorage.getItem('token');

                if (token) {
                    // Include the token in the request headers
                    const response = await axios.get("https://gmail-authentication-jwt-registration.vercel.app/user/details", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log(response);
                    setData(response.data.User); // Assuming user details are under the 'User' property
                } else {
                    console.log("No token found.");
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />

            <main className="main-container">
                <div>
                    <form className="login-page-login-form" >
                        <h1>User Details</h1>
                        <div className="user-info">
                            <div>
                                <span className="label">Id: </span>
                                <span className="value">{data?._id}</span>
                            </div>
                            <div>
                                <span className="label">Name:  </span>
                                <span className="value">{data?.name}</span>
                            </div>
                            <div>
                                <span className="label">Email: </span>
                                <span className="value">{data?.email}</span>
                            </div>
                            
                        </div>
                        <button onClick={logoutfunction} className="login-button" type="submit">Logout</button>
                    </form>

                </div>
            </main>
        </>
    );
}

export default UserDetails;
