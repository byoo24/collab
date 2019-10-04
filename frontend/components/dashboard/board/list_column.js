import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { createCard } from '../../../actions/card_actions';

import CardRows from './card_rows';

const Container = styled.div``;
const Title = styled.h3``;
const ListContent = styled.div`
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#ebecf0')};
`;

const CardsContainer = styled.div``;


const ListColumn = (props) => {
    const { index, list, cards } = props;

    const [showNewCardForm, setShowNewCardForm] = useState(false);
    const [newCardInfo, setNewCardInfo] = useState({
        name: "",
        listId: list.id
    });

    function handleCreateCard(e) {
        e.preventDefault();
        props.createCard(newCardInfo);
    }

    function updateNewCardInfo(field, value) {
        const copyNewCardInfo = Object.assign({}, newCardInfo);
        copyNewCardInfo[field] = value;
        setNewCardInfo(copyNewCardInfo);
    }



    return (
        <Draggable draggableId={list.id} index={index}>
            {(provided) => (
                <Container 
                    className="list_wrap"
                    {...provided.draggableProps} 
                    ref={provided.innerRef}
                >
                <ListContent className="list_content">
                    
                    <Title {...provided.dragHandleProps}>{list.name}</Title>

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
                            <div onClick={() => setShowNewCardForm(true)}>+ Add another card</div>
                        ) : (
                            <form onSubmit={(e) => handleCreateCard(e)}>
                                <div className="form_row">
                                    <input type="text" 
                                        placeholder="Enter a card title"
                                        value={newCardInfo.name}
                                        onChange={(e) => updateNewCardInfo('name', e.target.value)} />
                                </div>
                                <div className="form_row">
                                    <input type="submit"
                                        value="Add List" />
                                    <span onClick={() => setShowNewCardForm(false)}>Close</span>
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