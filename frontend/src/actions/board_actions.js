import * as APIUtil from '../util/board_api_util';

export const RECEIVE_BOARD = "RECEIVE_BOARD";
export const RECEIVE_UPDATED_BOARD = "RECEIVE_UPDATED_BOARD";


export const receiveBoard = ({ board, user}) => {
    return {
        type: RECEIVE_BOARD,
        board,
        user
    }
}


export const receiveUpdatedBoard = ({ board }) => {
    return {
        type: RECEIVE_UPDATED_BOARD,
        board
    }
}


export const createBoard = input => dispatch =>(
    APIUtil.createBoard(input).then(res => {
        const { data, errors } = res;
        
        if (errors) {
            console.log(errors);
        } else {
            const { board, user } = data;

            return dispatch(receiveBoard({
                board,
                user
            }));

        }
    })
)


export const updateBoard = board => dispatch => {

    APIUtil.updateBoard(board).then(res => {
        const { data, errors } = res;

        if (errors) {
            console.log(errors);
        } else {
            const { board } = data;
            dispatch(receiveUpdatedBoard({ board }));
        }
    })
}