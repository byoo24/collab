import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '../../libs/helper_methods';
import { 
    signup,
    clearSessionErrors,
} from '../../actions/session_actions';

const Signup = (props) => {
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    })
    
    // ComponentWillUnmount
    useEffect(() => {
        return function clearErrors() {
            if (!isEmpty(props.errors)) {
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

    return(
        <div>
            <div className="errors">
                { Object.values(props.errors) }
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="username">
                    <input 
                        type="text"
                        placeholder="username"
                        value={userInfo.username}
                        onChange={(e) => updateUserInfo("username", e.target.value)} 
                        />
                </label>

                <label htmlFor="email">
                    <input
                        type="email"
                        placeholder="email"
                        value={userInfo.email}
                        onChange={(e) => updateUserInfo("email", e.target.value)} 
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

                <label htmlFor="password2">
                    <input
                        type="password"
                        placeholder="confirm password"
                        value={userInfo.password2}
                        onChange={(e) => updateUserInfo("password2", e.target.value)} 
                        />
                </label>

                <input type="submit" value="Sign Up!"/>
            </form>
        </div>
    )
}


const msp = state => {
    return {
        errors: state.errors.session
    }
}


const mdp = dispatch => {
    return {
        signup: (user) => dispatch(signup(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    }
}

export default connect(msp, mdp)(Signup);