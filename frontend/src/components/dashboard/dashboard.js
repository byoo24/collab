import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { CustomRoute } from '../../util/route_util';
import { connect } from 'react-redux';

import { getSessionData, logout } from '../../actions/session_actions';

import BoardIndex from './boards/boards_index';
import Board from './board/board_view';
import ModalComponent from './modals/modal_component';


const Dashboard = (props) => {

    // SETUP
    const { match, currentUser, getSessionData } = props;

    // ComponentDidMount
    useEffect(() => {
        getSessionData(currentUser.id);
    }, []);

    
    return (
        <>
        <ModalComponent modal={props.modal} />
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
        </>
    )
}





const msp = (state, ownProps) => {
    // Personal Board Index
    const currentUser = state.session || {};
    
    return {
        currentUser,
        modal: state.modal
    }
}


const mdp = (dispatch) => {
    return {
        getSessionData: (userId) => dispatch(getSessionData(userId)),
        logout: () => dispatch(logout())
    }
}


export default connect(msp, mdp)(Dashboard);