import React from 'react'
import { Link } from 'react-router-dom'
function HomeHeader() {
  return (
  <>
     <React.Fragment>
            <div className="header-container">
                <div className="header-left-side">
                    <div className="header-logo-wrapper">
                        <img src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png" alt="Logo" />
                        <p className="header-brand-name">Kafene</p>
                      
                    </div>
                    <div> 
                    <Link className="nav-bar" to={"/signup"}>Register</Link>
                    
                    <Link className="nav-bar" to={"/login"}>Login</Link>
                        {/* {renderButton()} */}</div>
                   
                    
                </div>
            </div>
        </React.Fragment>
  </>
  )
}

export default HomeHeader