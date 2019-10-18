import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBoard } from '../../../actions/board_actions';
import { modalClear } from '../../../actions/modals_action';




const ModalNewBoard = (props) => {
    const inputColor = useRef(null);
    const boardBG = useRef(null);
    const [newBoard, setNewBoard] = useState({
        name: '',
        userId: props.userId,
        bgColor: 'blue'
    });


    function updateNewBoard(field, value) {
        setNewBoard({ ...newBoard, [field]: value });
    }

    function handleClickBG(e, color) {
        const prev = inputColor.current.querySelector('.selected');
        
        prev.classList.remove('selected');
        e.target.classList.add('selected');
        boardBG.current.classList = `create_tile bg-${color}`;
        
        updateNewBoard('bgColor', color);
    }

    function handleCreateBoard(e) {
        e.preventDefault();
        // debugger

        props.createBoard(newBoard)
            .then(props.modalClear())
            .then((promise) => {
                const newBoard = promise.board
                props.history.push(`/dashboard/boards/${newBoard.id}`);
            });
    }
    // debugger
    return (
        <div className="modal_container">
            <form className="modal_new_board" onSubmit={(e) => handleCreateBoard(e)}>
                <div className="modal_new_board-wrap">
                    <div className="create_tile bg-blue" ref={boardBG}>
                        <input type="text"
                            placeholder="Add board title"
                            value={newBoard.name}
                            onChange={(e) => updateNewBoard('name', e.target.value)} /> 
                        <span className="create_tile-close material-icons" onClick={props.modalClear}>clear</span>
                    </div>
                    <ul className="background_grid" ref={inputColor}>
                        <li className="background_grid-item bg-blue selected" onClick={(e) => handleClickBG(e, 'blue')}></li>
                        <li className="background_grid-item bg-orange" onClick={(e) => handleClickBG(e, 'orange')}></li>
                        <li className="background_grid-item bg-green" onClick={(e) => handleClickBG(e, 'green')}></li>
                        <li className="background_grid-item bg-red" onClick={(e) => handleClickBG(e, 'red')}></li>
                        <li className="background_grid-item bg-purple" onClick={(e) => handleClickBG(e, 'purple')}></li>
                        <li className="background_grid-item bg-pink" onClick={(e) => handleClickBG(e, 'pink')}></li>
                    </ul>
                </div>
                <input type="submit" value="Create Board" />
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

export default withRouter(connect(msp, mdp)(ModalNewBoard));