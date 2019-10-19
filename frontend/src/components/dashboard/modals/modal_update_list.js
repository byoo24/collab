import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateList, deleteList } from '../../../actions/list_actions';
import { modalClear } from '../../../actions/modals_action';



const ModalUpdatList = (props) => {
    const [listInfo, setListInfo] = useState(props.data);

    function updateListInfo(field, value) {
        setListInfo({ ...listInfo, [field]: value });
    }

    function handleUpdateList(e) {
        e.preventDefault();
        props.updateList(listInfo)
            .then(props.modalClear());
    }

    function handleDeleteList() {
        props.deleteList(listInfo)
        props.modalClear();
    }

    return (
        <div className="modal_container">
            <form className="modal_update_list" onSubmit={(e) => handleUpdateList(e)}>
                <div className="modal_col">
                    <h5>List Title</h5>
                </div>
                <div className="modal_col">
                    <input type="text"
                        placeholder="List title is required"
                        value={listInfo.name}
                        onChange={(e) => updateListInfo('name', e.target.value)}
                        required
                    />
                </div>
                <div className="modal_col">
                    <input type="submit" value="Update List" />
                    <span className="deleteCard" onClick={handleDeleteList}>Delete List</span>
                </div>
                <span className="modal_close_btn material-icons" onClick={props.modalClear}>clear</span>
            </form>
            <div className="modal_close_area" onClick={props.modalClear}></div>
        </div>
    )
}



const mdp = (dispatch) => {
    return {
        updateList: (card) => dispatch(updateList(card)),
        modalClear: () => dispatch(modalClear()),
        deleteList: (list) => dispatch(deleteList(list))
    }
}


export default connect(null, mdp)(ModalUpdatList);