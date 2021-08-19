import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { useStore } from './zustand/useStore';
import Routes from './components/routes';
import Header from './components/Header';
import './App.css';


const App: React.FC<RouteComponentProps> = ({ history }) => {

    const loggedIn = useStore(state => state.loggedIn);

    useEffect(() => {
        if (loggedIn) {
            history.push('/');
        } else {
            history.push('/login');
        }
    }, [loggedIn])
    
    return (
        <div className="app-body py-3">
            <Header />
            <main>
                <Routes />    
            </main>
        </div>
    );
}

export default withRouter(App);
