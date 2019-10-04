import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { CustomRoute } from '../../util/route_util';
import { connect } from 'react-redux';

import { getSessionData } from '../../actions/session_actions';

import BoardIndex from './boards/boards_index';
import Board from './board/board_view';



const Dashboard = (props) => {

    // SETUP
    const { match } = props;

    // ComponentDidMount
    useEffect(() => {
        props.getSessionData(props.currentUser.id);
    }, []);

    
    return (
        <div className="content_wrap">
            <div id="content">
                <Switch>
                    <CustomRoute exact path={match.url + "/"}
                        component={BoardIndex}
                    />
                    <CustomRoute exact path={match.url + "/boards/:boardId"}
                        component={Board}
                    />
                </Switch>
            </div>
            
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