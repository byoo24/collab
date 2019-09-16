import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createList } from '../../../actions/list_actions';



const Board = (props) => {

    
    // SETUP
    const [ newListName, setNewListName ] = useState("");
    const { board, lists } = props;
    let name = null, description = null, listIds = null;

    if (board) {
        name = board.name;
        description = board.description;
        listIds = board.listIds;
    }


    
    const handleCreateList = (e) => {
        e.preventDefault();
        props.createList({
            name: newListName,
            boardId: board.id,
            listIds: listIds
        });
    }

    const listItems = lists.map(list => {
        return (
            <li key={list.id} className="list_item">
                <h2>{list.name}</h2>
            </li>
        )
    })

    return (
        <div className="board_main">
            <div className="board_main-container">
                <h1>BOARD</h1>
                <header className="board_main-header">
                    <h1 className="board_main-title">{ name }</h1>
                </header>

                <ul className="list_main">
                    
                    { listItems }

                    <li className="list_item">
                        <form onSubmit={(e) => handleCreateList(e)}>
                            <input 
                                type="text" 
                                placeholder="Enter list title"
                                value={ newListName }
                                onChange={(e) => setNewListName(e.target.value)} />
                            <input type="submit" value="Add List" />
                        </form>
                    </li>
                </ul>

            </div>
        </div>
    )
}









const msp = (state, ownProps) => {
    // Individual Board
    const boardId = ownProps.match.params.boardId || null;
    const board = boardId ? state.boards[boardId] : null;

    // Board's List Index
    const listIds = board ? board.listIds : null;
    const lists = listIds ? listIds.map(listId => state.lists[listId]) : null;

    return {
        board,
        lists
    }
}



const mdp = (dispatch) => {
    return {
        createList: (list) => dispatch(createList(list))
    }
}


export default connect(msp, mdp)(Board);