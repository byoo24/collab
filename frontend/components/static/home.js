import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';

const Home = (props) => {
    const [userInfo, setUserInfo] = useState({
        username: 'demouser',
        email: 'demouser@gmail.com',
        password: 'password123',
        password2: 'password123'
    });

    const [loginData, setLoginData] = useState({
        username: 'demouser',
        password: 'password123'
    });

    const handleSignUp = () => {
        props.signup(userInfo);
    }

    
    return (
        <div id="main">
            <button className="signup" onClick={handleSignUp}>Sign Up</button>
            <button className="login">Login</button>
        </div>
    )
}


const mdp = (dispatch) => {
    return {
        signup: (user) => dispatch(signup(user))
    }
}

export default connect(null, mdp)(Home);