import React from 'react';
import { connect } from 'react-redux';
import { modalClear } from '../../../actions/modals_action';

import NewBoard from './modal_new_board';

const modalComponent = (props) => {
    let { modal, modalClear } = props;
    let showComponent;

    switch(modal) {
        case 'MODAL_NEW_BOARD':
            showComponent = <NewBoard />;
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