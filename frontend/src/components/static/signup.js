import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from '../../libs/helper_methods';
import { signup, login, clearSessionErrors } from '../../actions/session_actions';

const Signup = (props) => {
    const { errors } = props;
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    })
    
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
        setUserInfo({...userInfo, [field]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.signup(userInfo);
    }

    const handleGuestLogin = (e) => {
        e.preventDefault();
        props.login({
            username: "demouser",
            password: "password123"
        })
    }


    return (
        <section className="main_session">
            <div className="session_container">
                <div className="session_form">

                    <div className="session_header">
                        <h1 className="session_title">Create a Collab Account</h1>
                        <span className="session_account">
                            <Link to="/login">or sign in to your account</Link>
                        </span>
                        <span className="guest_account">
                            <Link to="/" onClick={(e) => handleGuestLogin(e)}>or use guest account</Link>
                        </span>
                    </div>
                    
                    <form className="sign_up_container" onSubmit={(e) => handleSubmit(e)}>
                        
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

                        <label for="email" className="required_field">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            tabIndex="0"
                            autoCorrect="off"
                            spellCheck="false"
                            autoCapitalize="off"
                            placeholder="e.g., harry@potter.com"
                            value={userInfo.email}
                            className={errors.email ? 'error' : ''}
                            onChange={e => updateUserInfo("email", e.target.value)}
                        />
                        {errors.email ? (
                            <div className="error_field">{errors.email}</div>
                        ) : (null)}

                        <label for="password1" className="required_field">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password1"
                            id="password1"
                            placeholder="e.g., *********"
                            value={userInfo.password}
                            className={errors.password ? 'error' : ''}
                            onChange={e => updateUserInfo("password", e.target.value)}
                        />
                        {errors.password ? (
                            <div className="error_field">{errors.password}</div>
                        ) : (null)}

                        <label for="password2" className="required_field">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="password2"
                            id="password2"
                            placeholder="Same as above"
                            value={userInfo.password}
                            className={errors.password2 ? 'error' : ''}
                            onChange={e => updateUserInfo("password2", e.target.value)}
                        />
                        {errors.password2 ? (
                            <div className="error_field">{errors.password2}</div>
                        ) : (null)}

                        <input type="submit" value="Create New Account" />
                    </form>
                </div>
            </div>
        </section>
    );
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
        signup: (user) => dispatch(signup(user)),
        login: (user) => dispatch(login(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    }
}

export default connect(msp, mdp)(Signup);