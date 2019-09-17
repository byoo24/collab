import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { CustomRoute } from '../../util/route_util';
import { connect } from 'react-redux';

import { getSessionData } from '../../actions/session_actions';

import BoardIndex from './boards/boardIndex';
import Board from './boards/board';



const Dashboard = (props) => {

    // SETUP
    const { match } = props;

    // ComponentDidMount
    useEffect(() => {
        props.getSessionData(props.currentUser.id);
    }, []);

    
    return (
        <div>
            <h1>Dashboard</h1>

            <Switch>
                <CustomRoute exact path={match.url + "/"} 
                        component={ BoardIndex } 
                        currentUser={ props.currentUser }
                />
                <CustomRoute exact path={match.url + "/board/:boardId"} 
                        component={ Board }
                />
            </Switch>
        </div>
    )
}




const msp = (state) => {
    // Personal Board Index
    const currentUser = state.session || {};
    
    return {
        currentUser,
    }
}


const mdp = (dispatch) => {
    return {
        getSessionData: (userId) => dispatch(getSessionData(userId)),
    }
}

export default connect(msp, mdp)(Dashboard);