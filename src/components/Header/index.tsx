import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { useStore } from '../../zustand/useStore';

const Header: React.FC<RouteComponentProps> = ({ history }) => {

    const { loggedIn, setLoggedIn } = useStore(state => state);

    const handleGoToMainClick = () => {
        history.push('/')
    }

    const handleLogOut = () => {
        setLoggedIn(false);
        localStorage.setItem('loggedIn', 'false');
    }

    const handleLogIn = () => {
        history.push('/login');
    }

    return (
        <header>
            <div className="container-fluid d-flex flex-column flex-md-row align-items-center py-2 px-3 bg-dark mb-4">
                <button type="button" className="btn btn-dark" onClick={handleGoToMainClick}>Bridge</button>
                <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    {loggedIn ? (
                        <button type="button" className="btn btn-dark btn-sm border-secondary" onClick={handleLogOut}>Log out</button>
                    ) : (
                        <button type="button" className="btn btn-dark btn-sm border-secondary" onClick={handleLogIn}>Login</button>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default withRouter(Header);