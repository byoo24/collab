import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { updateBoard } from '../../../actions/board_actions';
import { createList } from '../../../actions/list_actions';
import ListColumn from './list_column';


const bgColor = {
    backgroundColor: 'rgb(0, 121, 191)'
}
const Container = styled.div``;


const BoardView = (props) => {
    const { board, lists, allCards } = props;

    // Board
    const [boardInfo, setBoardInfo] = useState(board);
    const [updateDebounce, setUpdateDebounce] = useState(() => debounce(1000));
    const listOrder = boardInfo.listIds ? boardInfo.listIds : [];

    // Lists
    const [allLists, setAllLists] = useState(lists);
    const [showNewListForm, setShowNewListForm] = useState(false);
    const [newListInfo, setNewListInfo] = useState({
        name: "",
        boardId: boardInfo.id
    });

    function handleCreateList(e) {
        e.preventDefault();
        props.createList(newListInfo);
    }

    function updateNewListInfo(field, value) {
        const copyNewListInfo = Object.assign({}, newListInfo);
        copyNewListInfo[field] = value;
        setNewListInfo(copyNewListInfo);
    }


    // ComponentDidUpdate
    useEffect(() => {
        if (boardInfo !== board) {
            setBoardInfo(board);
            updateNewListInfo('boardId', board.id)
        }
    }, [board]);

    useEffect(() => {
        if (allLists !== lists) {
            setAllLists(lists);
        }
    }, [lists]);


    // setState for BoardInfo
    // this is used to update the order of Lists
    function updateBoardInfo (field, value) {
        const copyBoardInfo = Object.assign({}, boardInfo);

        copyBoardInfo[field] = value;
        setBoardInfo(copyBoardInfo);
        updateDebounce(copyBoardInfo);
    }


    function debounce(interval) {
        let timeout;

        return (arg) => {
            const fnCall = () => {
                timeout = null;
                props.updateBoard(arg);
            }

            clearTimeout(timeout);
            timeout = setTimeout(fnCall, interval);
        }
    }


    // Takes in an array of Lists
    // because if two or more Lists need to be updated simultaneously
    function updateLists(arrLists) {
        const copyAllLists = Object.assign({}, allLists);
        arrLists.forEach(list => {
            copyAllLists[list.id] = list;
        });
        setAllLists(copyAllLists);
    }


    function onDragEnd(result) {
        const { destination, source, draggableId, type } = result;

        // Dropped item is in an invalid area
        if (!destination) {
            return;
        }

        // Dropped item is in its original location
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        // Dragged item is a List
        if (type === 'lists') {
            const newListOrder = Array.from(listOrder);
            newListOrder.splice(source.index, 1);
            newListOrder.splice(destination.index, 0, draggableId);

            updateBoardInfo('listIds', newListOrder);
            return;
        }

        // Dragged item is a Card
        const homeList = allLists[source.droppableId];
        const foreignList = allLists[destination.droppableId];

        // Card is in the same List
        if (homeList === foreignList) {
            const newCardOrder = Array.from(homeList.cardIds);
            newCardOrder.splice(source.index, 1);
            newCardOrder.splice(destination.index, 0, draggableId);

            homeList.cardIds = newCardOrder;
            updateLists([homeList]);
            return;
        } else {
            // Card is in a different List
            const newHomeCardOrder = Array.from(homeList.cardIds);
            newHomeCardOrder.splice(source.index, 1);

            const newForeignCardOrder = Array.from(foreignList.cardIds);
            newForeignCardOrder.splice(destination.index, 0, draggableId);

            homeList.cardIds = newHomeCardOrder;
            foreignList.cardIds = newForeignCardOrder;
            updateLists([homeList, foreignList]);
            return;
        }
    }

    
    return(
        <div className="board_wrap">
            <div style={bgColor} className="board_main-content">
                <div className="board_header">
                    <h1 className="board_title">{board.name}</h1>
                </div>

                <div className="board_view">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable
                            droppableId="all-columns"
                            direction="horizontal"
                            type="lists"
                        >
                            {provided => (
                                <Container
                                    id="board"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {listOrder.map((listId, idx) => {
                                        const list = allLists[listId];
                                        const cardOrder = list.cardIds;
                                        const cards = cardOrder.map(cardId => allCards[cardId]);

                                        return (
                                            <ListColumn key={list.id} index={idx} list={list} cards={cards} />
                                        );
                                    })}

                                    {provided.placeholder}
                                </Container>
                            )}
                        </Droppable>
                    </DragDropContext>


                    <div className="list_add">
                        <div className="list_add-wrap">

                            {
                                !showNewListForm ? (
                                    <div className="list_add-text" onClick={() => setShowNewListForm(true)}>+ Add another list</div>
                                ) : (
                                    <form className="list_add-form" onSubmit={(e) => handleCreateList(e)}>
                                        <div className="form_row">
                                            <input type="text"
                                                placeholder="Enter list title"
                                                value={newListInfo.name}
                                                onChange={(e) => updateNewListInfo('name', e.target.value)} />
                                        </div>
                                        <div className="form_row">
                                            <input type="submit"
                                                value="Add List" />

                                            <i className="form_close material-icons" onClick={() => setShowNewListForm(false)}>clear</i>
                                        </div>
                                    </form>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}









const msp = (state, ownProps) => {
    const boardId = ownProps.match.params.boardId;
    const board = state.boards[boardId] || {};

    const listIds = board.listIds ? board.listIds : [];
    const lists = {};
    for(let key of listIds) lists[key] = state.lists[key];
    

    const cards = {};
    Object.keys(lists).forEach(listKey => {
        let list = lists[listKey];
        let cardIds = list.cardIds;
        for(let key of cardIds) cards[key] = state.cards[key];
    })


    return {
        board,
        lists,
        allCards: cards
    }
}


const mdp = (dispatch) => {
    return {
        updateBoard: (board) => dispatch(updateBoard(board)),
        createList: (list) => dispatch(createList(list))
    }
}


export default connect(msp, mdp)(BoardView);