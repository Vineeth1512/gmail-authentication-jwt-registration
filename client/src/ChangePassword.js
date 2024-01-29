import React from 'react'

function ChangePassword() {
    return (
        <>
            <div className="wrapper">
                <h2>Change Password</h2>
                <form action="#">

                    <div className="input-box">
                        <input type="password" placeholder="Create password" required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Confirm password" required />
                    </div>
                    <div className="input-box button">
                        <input type="Submit" value="Submit" />
                    </div>

                </form>
            </div>
        </>
    )
}

export default ChangePassword