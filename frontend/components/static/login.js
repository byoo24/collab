import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '../../libs/helper_methods';
import {
    login,
    clearSessionErrors,
} from '../../actions/session_actions';

const Login = (props) => {
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    });
    
    // ComponentWillUnmount
    useEffect(() => {
        return function clearErrors() {
            if (!isEmpty(props.errors)) {
                props.clearSessionErrors();
            }
        }
    }, []);

    const updateUserInfo = (field, value) => {
        setUserInfo({ ...userInfo, [field]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.login(userInfo);
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="username">
                <input
                    type="text"
                    placeholder="username"
                    value={userInfo.username}
                    onChange={(e) => updateUserInfo("username", e.target.value)}
                />
            </label>

            <label htmlFor="password">
                <input
                    type="password"
                    placeholder="password"
                    value={userInfo.password}
                    onChange={(e) => updateUserInfo("password", e.target.value)}
                />
            </label>

            <input type="submit" value="Login!" />
        </form>
    )
}


const msp = state => {
    return {
        errors: state.errors.session
    }
}


const mdp = dispatch => {
    return {
        login: (user) => dispatch(login(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    }
}

export default connect(msp, mdp)(Login);