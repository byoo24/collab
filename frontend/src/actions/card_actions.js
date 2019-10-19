import * as APIUtil from '../util/card_api_util';


export const RECEIVE_CARD = "RECEIVE_CARD";
export const REMOVE_CARD = "REMOVE_CARD";
export const RECEIVE_UPDATED_CARD = "RECEIVE_UPDATED_CARD";



export const receiveCard = ({ card, list }) => {
    return {
        type: RECEIVE_CARD,
        card,
        list
    }
}


export const receiveUpdatedCard = ({ card }) => {
    return {
        type: RECEIVE_UPDATED_CARD,
        card
    }
}


export const removeCard = ({ cardId, listId }) => {
    return {
        type: REMOVE_CARD,
        cardId,
        listId
    }
}





export const createCard = input => dispatch => (
    APIUtil.createCard(input).then(res => {
        const { data, errors } = res;

        if (errors) {
            console.log(errors);
        } else {
            const { card, list } = data;
            
            return dispatch(receiveCard({
                card,
                list
            }));
        }
    })
);



export const updateCard = input => dispatch => (
    APIUtil.updateCard(input).then(res => {
        const { data, errors } = res;

        if (errors) {
            console.log(errors);
        } else {
            const { card } = data;

            return dispatch(receiveUpdatedCard({
                card
            }));
        }
    })
);



export const deleteCard = card => dispatch => {
    APIUtil.deleteCard(card).then(res => {
        const { data, errors } = res.data;
        
        if (errors) {
            console.log(errors);
        } else {
            const { deleteCard } = data;
            debugger
            return dispatch(removeCard({
                cardId: deleteCard.id,
                listId: deleteCard.listId
            }))
        }
    })
}

