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
        <div className="main-signin">
            

            <div className="ui center aligned text grid container">

                
                <div className="twelve wide column">

                    <div className="logo">
                        <img src="./images/logo-blue.svg" />
                        <span className="logo-text">collab</span>
                    </div>
                    
                    <form className="ui large form" onSubmit={(e) => handleSubmit(e)}>

                        {uiErrors}

                        <div className="ui raised segment">

                            <div className="field">
                                <div className={`ui left icon input ${errors.username ? 'error' : ''}`}>
                                    <i className="user icon"></i>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={userInfo.username}
                                        onChange={e => updateUserInfo("username", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className={`ui left icon input ${errors.password ? 'error' : ''}`}>
                                    <i className="lock alternate icon"></i>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={userInfo.password}
                                        onChange={e => updateUserInfo("password", e.target.value)}
                                    />
                                </div>
                            </div>

                            <input type="submit" className="ui fluid large blue submit button" value="Login" />

                        </div>
                    </form>

                    <div className="ui message">
                        New here? <Link to="/signup">Signup</Link>
                    </div>
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