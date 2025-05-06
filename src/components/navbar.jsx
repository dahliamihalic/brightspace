import { useAuth } from '../contexts/AuthContext'
import React from "react";
import "../styles/navbar.css";
function Navbar() {
    const { isLogin, user, logout, isLoading } = useAuth();

    if (isLoading) return <div className="navbar-loading">Loading...</div>;

    return (
        <nav className="navbar">
            <ul>
                {!isLogin ? (
                    <li className="navbar-brand">
                        <img src="https://web.ics.purdue.edu/~omihalic/brightspace-app/D2L_Brightspace-2.png" alt="D2L Logo" />
                    </li>
                ) : (
                    <>
                        <li className="home"><a href="/"><img src="https://web.ics.purdue.edu/~omihalic/brightspace-app/home.png" alt="Home" /></a></li>
                        <li className="vertical-line">|</li>
                        <li className="log"><img src="https://web.ics.purdue.edu/~omihalic/brightspace-app//purduelog.png" alt="Purdue Logo" /></li>
                        <li className='span'></li>
                        <li className="app-symbol"><img src="https://web.ics.purdue.edu/~omihalic/brightspace-app/apps.png" alt="App Symbol" /></li>
                        <li className="mail-symbol"><img src="https://web.ics.purdue.edu/~omihalic/brightspace-app/messages.png" alt="Mail Symbol" /></li>
                        <li className="message-symbol"><img src="https://web.ics.purdue.edu/~omihalic/brightspace-app/notifications.png" alt="Message Symbol" /></li>
                        <li className="notifications-symbol"><img src="https://web.ics.purdue.edu/~omihalic/brightspace-app/bell.png" alt="Notifications Symbol" /></li>
                        <li className="vertical-line">|</li>
                        <li className="user-photo"><img src="https://web.ics.purdue.edu/~omihalic/brightspace-app/bg.png" alt="User Photo" /></li>
                        <li className="user-name">
                            <span className='username'>
                                {user?.username || 'User'}
                            </span>
                        </li>
                        <button onClick={logout}>Logout</button>
                    </> 
                )}
            </ul>
        </nav>
    );
}



export default Navbar;