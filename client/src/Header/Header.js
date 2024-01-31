import React from "react";
import "./Header.css"
import { Link,  } from "react-router-dom";
function Header() {
    return (
        <React.Fragment>
            <div className="header-container">
                <div className="header-left-side">
                    <div className="header-logo-wrapper">
                        <img src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="Logo" />
                        <p className="header-brand-name">Kafene</p>
                    </div>
                    <div>
                        <div className="header-nav">
                        <nav>
                        <Link className="nav-bar" to={"/"}>Home</Link>
                            <Link className="nav-bar" to={"/signup"}>SignUp</Link>
                            <Link className="nav-bar" to={"/login"}>Login</Link>
                        </nav>
                        </div>
                    </div> 
                </div>
            </div>
        </React.Fragment>
    )
}
export default Header;
