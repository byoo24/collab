import * as APIUtil from '../util/card_api_util';


export const RECEIVE_CARD = "RECEIVE_CARD";



export const receiveCard = ({ card, list }) => {
    return {
        type: RECEIVE_CARD,
        card,
        list
    }
}




export const createCard = input => dispatch => (
    APIUtil.createCard(input).then(res => {
        const { data, errors } = res;

        if (errors) {
            console.log(errors);
        } else {
            const { card, list } = data;
            
            dispatch(receiveCard({
                card,
                list
            }));
        }
    })
)



