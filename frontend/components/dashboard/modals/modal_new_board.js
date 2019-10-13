import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createBoard } from '../../../actions/board_actions';
import { modalClear } from '../../../actions/modals_action';




const modalNewBoard = (props) => {
    const [newBoard, setNewBoard] = useState({
        name: '',
        userId: props.userId
    });


    function updateNewBoard(field, value) {
        setNewBoard({ ...newBoard, [field]: value });
    }

    function handleCreateBoard(e) {
        e.preventDefault();

        props.createBoard(newBoard)
            .then(props.modalClear());
    }

    return (
        <div className="modal_container">
            <form className="modal_new_board" onSubmit={(e) => handleCreateBoard(e)}>
                <div className="modal_col">
                    <input type="text"
                        placeholder="Add board title"
                        value={newBoard.name}
                        onChange={(e) => updateNewBoard('name', e.target.value)} /> 
                </div>
                <div className="modal_col">
                    <input type="submit" value="Create Board" />
                </div>
                <span className="modal_close_btn material-icons" onClick={props.modalClear}>clear</span>
            </form>
            <div className="modal_close_area" onClick={props.modalClear}></div>
        </div>
    )
}

const msp = (state) => {
    return {
        userId: state.session.id
    }
}

const mdp = (dispatch) => {
    return {
        createBoard: (board) => dispatch(createBoard(board)),
        modalClear: () => dispatch(modalClear())
    }
}

export default connect(msp, mdp)(modalNewBoard);