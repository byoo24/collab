import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { modalUpdateCard } from '../../../actions/modals_action';


const Container = styled.div`
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;
const Title = styled.p``;



const CardRows = (props) => {
    const { index, card } = props;


    
    return(
        <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    className="card_item"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    onClick={() => props.modalUpdateCard(card)}
                >
                    <Title>{card.name}</Title>
                </Container>
            )}
        </Draggable>
    )
}

// const msp = (state, ownProps) => {
//     const { cardId } = ownProps;
//     return {
//         card: state.cards[cardId] || {}
//     }
// }

const mdp = (dispatch) => {
    return {
        modalUpdateCard: (data) => dispatch(modalUpdateCard(data))
    }
}

export default connect(null, mdp)(CardRows);