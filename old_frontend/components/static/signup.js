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
                    <div className="logo signup">
                        <img src="./images/logo-blue.svg" />
                        <span className="logo-text">Collab</span>
                    </div>

                    <h2 className="ui image header">
                        <div className="content">
                            Create a new account
                        </div>
                    </h2>

                    <form className="ui large form" onSubmit={(e) => handleSubmit(e)}>
                        
                        { uiErrors }

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
                                <div className={`ui left icon input ${errors.email ? 'error' : ''}`}>
                                    <i className="envelope icon"></i>
                                    <input
                                        type="email"
                                        placeholder="E-mail address"
                                        value={userInfo.email}
                                        onChange={e => updateUserInfo("email", e.target.value)}
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

                            <div className="field">
                                <div className={`ui left icon input ${errors.password2 ? 'error' : ''}`}>
                                    <i className="lock icon"></i>
                                    <input
                                        type="password"
                                        placeholder="Confirm password"
                                        value={userInfo.password2}
                                        onChange={e => updateUserInfo("password2", e.target.value)}
                                    />
                                </div>
                            </div>

                            <input type="submit" className="ui fluid large blue submit button" value="Sign Up" />
                        </div>
                    </form>
                    <div className="ui message">
                        <div>Already have an account? <Link to="/login">Login</Link></div>
                        <div>Guest Account? <a href="" onClick={(e) => handleGuestLogin(e)}>Demo Login</a></div>
                    </div>
                </div>
            </div>
        </div>
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