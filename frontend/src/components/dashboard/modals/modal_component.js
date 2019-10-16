import React from 'react';

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
    }

    
    return (
        <div className="modal">
            {showComponent}
        </div>
    )
}




export default modalComponent;