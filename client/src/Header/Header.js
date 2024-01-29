import React, { useState } from "react";
import "./Header.css"
import { Link, useNavigate } from "react-router-dom";
function Header(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    let localVaraible = JSON.parse(localStorage.getItem("isLoggedIn"));
   
    const renderButton = () => {
     
        if (props.isLoggedIn||localVaraible) {
            console.log(isLoggedIn);
            return <button className="logout-btn" onClick={() => {
                localStorage.setItem("isLoggedIn", false);
                setIsLoggedIn(false);
                navigate('/');
                window.location.href = '/';
            }}>Logout</button>
        } else {
            return "" ;
        }
    }

    return (
        <React.Fragment>
            <div className="header-container">
                <div className="header-left-side">
                    <div className="header-logo-wrapper">
                        <img src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="Logo" />
                        <p className="header-brand-name">Kafene</p>
                    </div>
                    <div>
                        <nav>
                        <Link className="nav-bar" to={"/home"}>Home</Link>
                            <Link className="nav-bar " to={"/contact"}>Contact</Link>
                            <Link className="nav-bar " to={"/about"}>About</Link>
                            <Link className="nav-bar" to={"/signup"}>Login/Register</Link>
                            {renderButton()}
                        </nav>
                    </div>
                   
                    
                </div>
            </div>
        </React.Fragment>
    )
}
export default Header;
