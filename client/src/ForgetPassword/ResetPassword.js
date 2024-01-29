import React from 'react'
import Header from '../Header/Header'
function ResetPassword(props) {
    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />
            <main className="main-container">
                <div>
                    <form className="login-page-login-form" >
                        <h1>Reset Password</h1>
                        <input className="input-field" type="email" placeholder="Enter your email" required />
                        <button className="login-button" type="submit">Submit</button>
                    </form>
                </div>
            </main>

        </>
    )
}

export default ResetPassword