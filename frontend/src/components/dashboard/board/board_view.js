import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { updateBoard } from '../../../actions/board_actions';
import { createList, updateListsArr } from '../../../actions/list_actions';
import ListColumn from './list_column';

import NavBar from '../../navbar/dashboard_nav';


const Container = styled.div``;


const BoardView = (props) => {
    const { currentUser, board, lists, allCards } = props;
    const bgColor = board ? board.bgColor : '';
    const updateDebounce = debounce(500);

    // Board
    const [boardInfo, setBoardInfo] = useState(board);
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
        props.createList(newListInfo)
        setNewListInfo({ ...newListInfo, "name": "" });
    }

    function updateNewListInfo(field, value) {
        setNewListInfo({...newListInfo, [field]: value});
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
        updateDebounce('board', copyBoardInfo);
    }


    // Takes in an array of Lists to update Cards
    // because if two or more Lists need to be updated simultaneously
    function updateLists(data) {
        const copyAllLists = Object.assign({}, allLists);
        data.listsArr.forEach(list => {
            copyAllLists[list.id] = list;
        });
        
        setAllLists(copyAllLists);
        updateDebounce('lists', data);
    }


    function debounce(interval) {
        let timeout;

        return (type, arg) => {
            const fnCall = () => {
                timeout = null;

                switch(type) {
                    case 'board':
                        props.updateBoard(arg);
                        break;
                    case 'lists':
                        props.updateListsArr(arg);
                        break;
                    default:
                        return;
                }
                
            }
            clearTimeout(timeout);
            timeout = setTimeout(fnCall, interval);
        }
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
        const startList = allLists[source.droppableId];
        const endList = allLists[destination.droppableId];

        // Card is in the same List
        if (startList === endList) {
            const newCardOrder = Array.from(startList.cardIds);
            newCardOrder.splice(source.index, 1);
            newCardOrder.splice(destination.index, 0, draggableId);

            startList.cardIds = newCardOrder;
            updateLists({
                cardId: draggableId,
                newListId: destination.droppableId,
                listsArr: [startList]
            });
            return;
        } else {
            // Card is in a different List
            const newStartCardOrder = Array.from(startList.cardIds);
            newStartCardOrder.splice(source.index, 1);

            const newEndCardOrder = Array.from(endList.cardIds);
            newEndCardOrder.splice(destination.index, 0, draggableId);

            startList.cardIds = newStartCardOrder;
            endList.cardIds = newEndCardOrder;
            updateLists({
                cardId: draggableId,
                newListId: destination.droppableId,
                listsArr: [startList, endList]
            });
            return;
        }
    }

    
    return(
        <div className="board_wrap">
            <div className={`board_main-content bg-${bgColor}`}>
                <NavBar currentUser={currentUser} logout={props.logout} classValue="dash_view" boards={props.boards} />

                <div className="board_header">
                    <h3 className="board_title">{board.name}</h3>
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
                                        const list = allLists[listId] || {};
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
                                    <div className="list_add-text" onClick={() => setShowNewListForm(true)}>+ Add list</div>
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
    const currentUser = state.session || {};

    const boardId = ownProps.match.params.boardId;
    const board = state.boards[boardId] || {};

    const listIds = board.listIds ? board.listIds : [];
    const lists = {};
    for(let key of listIds) lists[key] = state.lists[key];
    

    // const cards = {};
    // Object.keys(lists).forEach(listKey => {
    //     let list = lists[listKey];
    //     let cardIds = list.cardIds;
    //     for(let key of cardIds) cards[key] = state.cards[key];
    // })
    const cards = state.cards || {};


    return {
        currentUser,
        board,
        lists,
        allCards: cards,
        boards: state.boards
    }
}


const mdp = (dispatch) => {
    return {
        updateBoard: (board) => dispatch(updateBoard(board)),
        createList: (list) => dispatch(createList(list)),
        updateListsArr: (arr) => dispatch(updateListsArr(arr))
    }
}


export default connect(msp, mdp)(BoardView);