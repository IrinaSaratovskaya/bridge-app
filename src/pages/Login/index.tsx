import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { useStore } from '../../zustand/useStore';

const Login: React.FC<RouteComponentProps> = ({ history }) => {

    const mockUserData = {
        userEmail: 'admin',
        userPassword: '123456'
    }

    const setLoggedIn = useStore(state => state.setLoggedIn);
    
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e: any): void => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (email === mockUserData.userEmail && password === mockUserData.userPassword) {
            localStorage.setItem('loggedIn', 'true');
            setLoggedIn(true);
            history.push('/');
        } else {
            setShowError(true);
        }
    }

    return (
        <div className="signin-form">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Sign in to your account</h1>
                <div className="form-floating">
                    <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="name@example.com" 
                        className="form-control" 
                    />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating">
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Password" 
                        className="form-control" 
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                {showError && (
                    <p className="text-danger">"Имя пользователя или пароль введены не верно"</p>
                )}
            </form>
        </div>
    );
}

export default withRouter(Login);