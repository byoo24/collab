import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createList } from '../../actions/board_actions';


const Board = ({board, createList}) => {
    const { name, description } = board;
    const [ listName, setListName ] = useState("");


    const handleCreateList = (e) => {
        e.preventDefault();
        createList({
            name: listName,
            boardId: board.id
        });
    }

    return (
        <div className="board_main">
            <div className="board_main-container">
                <header className="board_main-header">
                    <h1 className="board_main-title">{ name }</h1>
                </header>

                <div className="list_main">

                </div>

                <div className="add-list">
                    <form onSubmit={(e) => handleCreateList(e)}>
                        <input 
                            type="text" 
                            placeholder="Enter list title"
                            value={ listName }
                            onChange={(e) => setListName(e.target.value)} />
                        <input type="submit" value="Add List" />
                    </form>
                </div>
            </div>
        </div>
    )
}



const msp = (state, ownProps) => {
    const boardId = ownProps.match.params.boardId;

    return {
        board: state.boards[boardId]
    }
}


const mdp = (dispatch) => {
    return {
        createList: (list) => dispatch(createList(list))
    }
}


export default connect(msp, mdp)(Board);