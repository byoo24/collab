import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { createCard } from '../../../actions/card_actions';
import CardRows from './card_rows';

const Container = styled.div``;
const Title = styled.div``;
const CardsContainer = styled.div``;
const ListContent = styled.div`
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#ebecf0')};
`;



const ListColumn = (props) => {
    const { index, list, cards } = props;

    // List
    const [showListNameForm, setShowListNameForm] = useState(false);
    const [listInfo, setListInfo] = useState(list);

    function updateListInfo(field, value){
        const copyListInfo = Object.assign(listInfo);
        copyListInfo[field] = value;
        setListInfo(copyListInfo);
    }

    function handleListUpdate(e) {
        e.preventDefault();
        console.log(listInfo);
    }


    // Cards
    const [showNewCardForm, setShowNewCardForm] = useState(false);
    const [newCardInfo, setNewCardInfo] = useState({
        name: "",
        listId: list.id
    });

    function updateNewCardInfo(field, value) {
        const copyNewCardInfo = Object.assign({}, newCardInfo);
        copyNewCardInfo[field] = value;
        setNewCardInfo(copyNewCardInfo);
    }

    function handleCreateCard(e) {
        e.preventDefault();
        props.createCard(newCardInfo);
    }

    
    // ComponentDidUpdate
    useEffect(() => {
        if (listInfo !== list.id) {
            setListInfo(list);
            updateNewCardInfo('listId', list.id);
        }
    }, [list]);



    return (
        <Draggable draggableId={list.id} index={index}>
            {(provided) => (
                <Container 
                    className="list_wrap"
                    {...provided.draggableProps} 
                    ref={provided.innerRef}
                >
                <ListContent className="list_content">
                    
                    <Title className="list_title" {...provided.dragHandleProps}>
                        {
                            !showListNameForm ? (
                                <>
                                <span className="list_title-text">
                                    {listInfo.name}
                                </span>
                                <span className="material-icons" onClick={() => setShowListNameForm(true)}>edit</span>
                                </>
                            ) : (
                                <>
                                <form className="list_title-form">
                                    <input type="text"
                                            placeholder="Title can't be blank"
                                            value={listInfo.name}
                                            onChange={(e) => updateListInfo('name', e.target.value)} 
                                            required />
                                </form>
                                <span className="material-icons" onClick={() => setShowListNameForm(false)}>clear</span>
                                </>
                            )
                        }
                            
                    </Title>

                    <Droppable droppableId={list.id} type="cards">
                        {(provided, snapshot) => (
                            <CardsContainer
                                className="cards_wrap"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {cards.map((card, idx) => <CardRows key={card.id} index={idx} card={card} />)}
                                {provided.placeholder}
                            </CardsContainer>
                        )}
                    </Droppable>

 
                    {
                        !showNewCardForm ? (
                            <div className="card_add-text" onClick={() => setShowNewCardForm(true)}>+ Add another card</div>
                        ) : (
                            <form className="card_add-form" onSubmit={(e) => handleCreateCard(e)}>
                                <div className="form_row">
                                    <textarea className="card_item card_add-title"
                                        placeholder="Enter a card title for this card..."
                                        onChange={(e) => updateNewCardInfo('name', e.target.value)}
                                        value={newCardInfo.name}></textarea>
                                </div>
                                <div className="form_row">
                                    <input type="submit" value="Add List" />
                                    <span className="form_close material-icons" onClick={() => setShowNewCardForm(false)}>clear</span>
                                </div>
                            </form>
                        )
                    }

                    </ListContent>
                </Container>
            )}
        </Draggable>
    )
}




const mdp = (dispatch) => {
    return {
        createCard: (card) => dispatch(createCard(card))
    }
}


export default connect(null, mdp)(ListColumn);