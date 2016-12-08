import {Router, Route, IndexRedirect, Link, browserHistory} from 'react-router';

import React from 'react';
import App from './App';
import Login from './Login';
import Register from './Register';

import query from './util/query';

function LoginPage () {
    return (
        <div>
            <Link to="/register">Register</Link>
            <Login />
        </div>
    );
}

function RegisterPage () {
    return (
        <div>
            <Link to="/login">Login</Link>
            <Register />
        </div>
    );
}

function MainPage () {
    return (
        <div>
            Logged in!
        </div>
    );
}

async function requireAuth (nextState, replace, next) {
    const res = await query({query: '{ auth }'});
    const {data} = await res.json();
    console.log('checking auth: ', data);
    if (data.auth) {
        console.log('auth success');
        next();
    } else {
        console.log('auth failed');
        replace('/login');
        next();
    }
}

const routes = (
    <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="login" component={LoginPage} />
        <Route path="main" component={MainPage} onEnter={requireAuth}/>
        <Route path="register" component={RegisterPage} />
    </Route>
);

const router = <Router history={browserHistory}>{routes}</Router>;
export default router;