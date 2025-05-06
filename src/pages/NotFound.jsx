import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
export const NotFound = () => {
    const { isLogin } = useContext(AuthContext);
    return (
        <div className="notFound">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <p>Please check the URL or return to the home page.</p>
            {isLogin && <p>Click <a href="/front">here</a> to go back to the front page.</p>
            } : {<p>Click <a href="/home">here</a> to go back to the home page.</p>}
        </div>
    );
}