import React from 'react';
import { connect } from 'react-redux';
import { modalClear } from '../../../actions/modals_action';

import NewBoard from './modal_new_board';
import UpdateCard from './modal_update_card';

const modalComponent = (props) => {
    let { modal } = props;
    let showComponent;

    switch(modal.type) {
        case 'MODAL_NEW_BOARD':
            showComponent = <NewBoard />;
            break;
        case 'MODAL_UPDATE_CARD':
            showComponent = <UpdateCard data={modal.data} />;
            break;
        default:
            showComponent = null;
            modal = null;
    }

    
    return (
        <>{
            modal ? (
                <div className="modal">
                    {showComponent}
                </div>
            ) : ( null )
        }</>
        
    )
}




export default modalComponent;