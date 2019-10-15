import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from '../../libs/helper_methods';
import {
    login,
    clearSessionErrors,
} from '../../actions/session_actions';

const Login = (props) => {
    const { errors } = props;
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    });
    
    useEffect(() => {
        // ComponentDidMount
        if (props.isErrors) {
            props.clearSessionErrors();
        }

        // ComponentWillUnmount
        return function clearErrors() {

            if (props.isErrors) {
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

    const handleGuestLogin = (e) => {
        e.preventDefault();
        props.login({
            username: "demouser",
            password: "password123"
        })
    }

    const uiErrors = props.isErrors ? (
        <div className="ui error message visible">
            <span className="ui left aligned header">
                There were some errors with your submission.
            </span>
            <ul className="list">
                {
                    Object.values(errors).map((error, idx) => {
                        return (
                            <li key={idx}>
                                {error}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    ) : null;


    return (
        <div className="main_session">
            <div className="session_container">
                <div className="session_form">

                    <div className="session_header">
                        <h1 className="session_title">Log in to Collab</h1>
                        <span className="session_account">
                            <Link to="/signup">or create an account</Link>
                        </span>
                        <span className="guest_account">
                            <Link to="/" onClick={(e) => handleGuestLogin(e)}>or use guest account</Link>
                        </span>
                    </div>

                    <form className="log_in_container" onSubmit={(e) => handleSubmit(e)}>
                        <label for="username" className="required_field">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            tabIndex="0"
                            autoCorrect="off"
                            spellCheck="false"
                            autoCapitalize="off"
                            placeholder="e.g., hermione"
                            value={userInfo.username}
                            className={errors.username ? 'error' : ''}
                            onChange={e => updateUserInfo("username", e.target.value)}
                        />
                        {errors.username ? (
                            <div className="error_field">{errors.username}</div>
                        ) : (null)}

                        <label for="password" className="required_field">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="e.g., *********"
                            value={userInfo.password}
                            className={errors.password ? 'error' : ''}
                            onChange={e => updateUserInfo("password", e.target.value)}
                        />
                        {errors.password ? (
                            <div className="error_field">{errors.password}</div>
                        ) : (null)}

                        <input type="submit" value="Log In" />

                    </form>
                </div>
            </div>
        </div>
        
    )
}


const msp = state => {
    const errors = state.errors.session;
    const isErrors = !isEmpty(errors);

    return {
        errors,
        isErrors
    }
}


const mdp = dispatch => {
    return {
        login: (user) => dispatch(login(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    }
}

export default connect(msp, mdp)(Login);