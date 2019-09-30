import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createList } from '../../../actions/list_actions';
import { isEmpty } from '../../../libs/helper_methods';

import List from './list';



const Board = (props) => {

    // SETUP
    const { board, lists } = props;
    const boardTitle = board.name || null;

    const [ newListInfo, setNewListInfo ] = useState({
        name: "",
        boardId: board.id,
    });


    // Update State
    const updateNewListInfo = (field, value) => {
        const copyListInfo = Object.assign({}, newListInfo);

        copyListInfo[field] = value;
        setNewListInfo(copyListInfo);
    }


    // Form Submission
    const handleCreateList = (e) => {
        e.preventDefault();
        props.createList(newListInfo);
    }

    
    const listItems = lists.map(list => {
        return (
            <div key={list.id} className="list_items">
                <List list={list} cardIds={list.cardIds}/>
            </div>
        )
    });

    return (
        <div className="board_main">
            <div className="board_main-container">
                <header className="board_main-header">
                    <h1 className="board_main-title">{ boardTitle }</h1>
                </header>

                <section className="list_main">
                    
                    { listItems }

                    <div className="list_items">
                        <form onSubmit={(e) => handleCreateList(e)}>
                            <input 
                                type="text" 
                                placeholder="Enter list title"
                                value={ newListInfo.info }
                                onChange={(e) => updateNewListInfo("name", e.target.value)} />
                            <input type="submit" value="New List" />
                        </form>
                    </div>
                </section>

            </div>
        </div>
    )
}









const msp = (state, ownProps) => {
    // Individual Board
    const boardId = ownProps.match.params.boardId || null;
    const board = state.boards[boardId] ? state.boards[boardId] : {};

    // Board's List Index
    const listIds = board.listIds ? board.listIds : [];
    const lists = isEmpty(state.lists) ? [] : listIds.map(listId => state.lists[listId]);
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